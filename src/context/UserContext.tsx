import { FC, ReactNode, createContext, useState, useEffect } from 'react';
import { UserData } from '../types/userData';
import { Activity } from '../types/activity';
import { toast } from 'react-hot-toast';

type UserContextType = {
  user: UserData | null;
  token: string | null;
  completionScore: number;
  activity: Activity | null;
  setCompletionScore: (score: number) => void;
  setUser: (user: UserData) => void;
  calculateCompletionScore: (user: UserData) => number;
};

type UserProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  token: null,
  completionScore: 0,
  activity: null,
  setCompletionScore: () => {},
  setUser: () => {},
  calculateCompletionScore: () => 0,
});

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [activity, setActivity] = useState<Activity | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [completionScore, setCompletionScore] = useState<number>(0);

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

        setUser(fetchedUser);

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
  }, []);

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

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        completionScore,
        activity,
        setCompletionScore,
        setUser,
        calculateCompletionScore,
      }}>
      {children}
    </UserContext.Provider>
  );
};
