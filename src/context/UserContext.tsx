import { FC, ReactNode, createContext, useState, useEffect } from 'react';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { ResponseType } from '../types/responseType';
import { UserData, UserJson } from '../types/userData';
import { Activity } from '../types/activity';
import { toast } from 'react-hot-toast';

type UserContextType = {
  supabase: SupabaseClient | null;
  user: UserData | null;
  token: string | null;
  completionScore: number;
  activity: Activity | null;
  isApproved: boolean;
  setBanner: (banner: File) => void;
  setImage: (image: File) => void;
  updateProfile: (user: UserData) => Promise<void>;
  setCompletionScore: (score: number) => void;
  setUser: (user: UserData) => void;
  calculateCompletionScore: (user: UserData) => number;
  setActivity: (activity: Activity) => void;
};

type UserProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextType>({
  supabase: null,
  user: null,
  token: null,
  completionScore: 0,
  activity: null,
  isApproved: false,
  setBanner: () => {},
  setImage: () => {},
  updateProfile: () => Promise.resolve(),
  setCompletionScore: () => {},
  setUser: () => {},
  calculateCompletionScore: () => 0,
  setActivity: () => {},
});

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [activity, setActivity] = useState<Activity | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [completionScore, setCompletionScore] = useState<number>(0);

  useEffect(() => {
    if (supabase === null) {
      const client = createClient(
        process.env.SUPABASE_URL as string,
        process.env.SUPABASE_SECRET_KEY as string
      );

      setSupabase(client);
    }
  }, [supabase]);

  useEffect(() => {
    async function fetchUserData(id: number, token: string) {
      const response = await fetch(
        `https://localhost:7297/Profiles/CheckTokenProfile?memberId=${id}&token=${token}`
      );
      const data = await response.json();

      console.log(data);

      if (data.StatusCode) {
        toast.error('Something went wrong');
      } else {
        const fetchedUser = data.member as UserData;

        if (supabase) {
          const { data: bannerData } = supabase.storage
            .from('banners')
            .getPublicUrl(`${fetchedUser.MemberId}`);

          const { data: imageData } = supabase.storage
            .from('avatars')
            .getPublicUrl(`${fetchedUser.MemberId}`);

          if (imageData) {
            fetchedUser.Image = imageData.publicUrl;
          }

          if (bannerData) {
            fetchedUser.Banner = bannerData.publicUrl;
          }
        }

        setUser(fetchedUser);

        const userJson: UserJson = JSON.parse(fetchedUser.Json);

        setIsApproved(userJson.IsApproved);

        setActivity(data.activitySection as Activity);

        setCompletionScore(calculateCompletionScore(fetchedUser));
      }
    }

    // get query param from url
    const params = new URLSearchParams(window.location.search);
    const memberId = params.get('memberId');
    const token = params.get('token');

    if (!memberId || !token) {
      toast.error('Something went wrong');
      return;
    }

    setToken(token);

    fetchUserData(+memberId, token);
  }, [supabase]);

  const calculateCompletionScore = (fetchedUser: UserData) => {
    let score = 0;

    if (fetchedUser.Banner || fetchedUser.Image) {
      score++;
    }

    if (fetchedUser.Name) score++;

    if (fetchedUser.DescriptionSection.Content) score++;

    if (fetchedUser.ServicesSection.Content) score++;

    if (
      fetchedUser.ContactsSection.Email ||
      fetchedUser.ContactsSection.PhoneNumber
    )
      score++;

    if (fetchedUser.ExternalLinksSection.ExternalLinks.length > 0) score++;

    if (fetchedUser.WorkExperienceSection.WorkExperiences.length > 0) score++;

    score = Math.floor((score / 7) * 100);

    return score;
  };

  const updateProfile = async (newUser: UserData) => {
    if (!user || !token) {
      toast.error('Something went wrong');
      return;
    }

    let bannerUrl = null;
    let imageUrl = null;

    if (supabase) {
      if (image) {
        // try replacing avatar if it already exists in bucket
        const { error: replaceError } = await supabase.storage
          .from('avatars')
          .update(`${user.MemberId}`, image, {
            upsert: true,
            cacheControl: '1',
          });

        if (replaceError) {
          // if avatar doesn't exist in bucket, upload it
          const { error } = await supabase.storage
            .from('avatars')
            .upload(`${user.MemberId}`, image);

          if (error) {
            console.log('upload ERROR: ', error);
          }
        }
      }

      if (banner) {
        const { error: replaceError } = await supabase.storage
          .from('banners')
          .update(`${user.MemberId}`, banner, {
            upsert: true,
            cacheControl: '1',
          });

        if (replaceError) {
          // if avatar doesn't exist in bucket, upload it
          const { error } = await supabase.storage
            .from('banners')
            .upload(`${user.MemberId}`, banner);

          if (error) {
            console.log('upload ERROR: ', error);
          }
        }
      }

      const { data: bannerData } = supabase.storage
        .from('banners')
        .getPublicUrl(`${user.MemberId}`);

      if (bannerData) {
        bannerUrl = bannerData.publicUrl;
      }

      const { data: imageData } = supabase.storage
        .from('avatars')
        .getPublicUrl(`${user.MemberId}`);

      if (imageData) {
        imageUrl = imageData.publicUrl;
      }
    }

    try {
      const response = await fetch(
        `https://localhost:7297/Profiles/UpdateProfile?memberId=${user.MemberId}&token=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...newUser,
            Banner: bannerUrl,
            Image: imageUrl,
          }),
        }
      );
      const data: ResponseType = await response.json();

      if (data.statusCode === 200) {
        toast.success('Profile updated successfully');
      } else {
        console.log(data);
        console.log(newUser);
        toast.error('Something went wrong');
      }

      setCompletionScore(calculateCompletionScore(newUser));
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        supabase,
        user,
        token,
        completionScore,
        activity,
        isApproved,
        setBanner,
        setImage,
        updateProfile,
        setCompletionScore,
        setUser,
        calculateCompletionScore,
        setActivity,
      }}>
      {children}
    </UserContext.Provider>
  );
};
