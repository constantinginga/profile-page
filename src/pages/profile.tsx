import { useEffect, useState, useContext } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserContext } from '../context/UserContext';
import { Toaster, toast } from 'react-hot-toast';

import { ResponseType } from '../types/responseType';
import {
  TExternalLinksSection,
  TWorkExperienceSection,
  DescriptionSection,
  ServicesSection,
  ContactsSection,
} from '../types/userData';

import PrimaryButton from '../components/primary-button';
import AboutMeSection from '../sections/profile/about-me-section';
import BasicInfoSection from '../sections/profile/basic-info-section';
import ShareProfile from '../sections/profile/share-profile';
import HelpSection from '../sections/profile/help-section';
import ContactSection from '../sections/profile/contact-section';
import WorkExperienceSection from '../sections/profile/work-experience-section';
import ExternalLinksSection from '../sections/profile/external-links-section';
import ActivitySection from '../sections/profile/activity-section';

const Profile = () => {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    user,
    activity,
    token,
    calculateCompletionScore,
    setCompletionScore,
    setActivity,
  } = useContext(UserContext);

  const [name, setName] = useState('');
  const [aboutMe, setAboutMe] = useState<DescriptionSection | null>(null);
  const [services, setServices] = useState<ServicesSection | null>(null);
  const [contact, setContact] = useState<ContactsSection | null>(null);
  const [workExperience, setWorkExperience] =
    useState<TWorkExperienceSection | null>(null);
  const [externalLinks, setExternalLinks] =
    useState<TExternalLinksSection | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedBanner, setSelectedBanner] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>('');
  const [bannerUrl, setBannerUrl] = useState<string | null>('');

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
    if (!user) return;

    setName(user.Name ? user.Name : '');
    setImageUrl(user.Image ? user.Image : '');
    setBannerUrl(user.Banner ? user.Banner : '');
    setAboutMe(user.DescriptionSection ? user.DescriptionSection : null);
    setServices(user.ServicesSection ? user.ServicesSection : null);
    // setPhone(user.ContactsSection ? user.ContactsSection.PhoneNumber : '');
    // setContactEmail(user.ContactsSection ? user.ContactsSection.Email : '');
    setContact(user.ContactsSection ? user.ContactsSection : null);
    setWorkExperience(
      user.WorkExperienceSection ? user.WorkExperienceSection : null
    );
    setExternalLinks(
      user.ExternalLinksSection ? user.ExternalLinksSection : null
    );
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);

    if (!user || !supabase) return;

    if (selectedImage) {
      // try replacing avatar if it already exists in bucket
      const { error: replaceError } = await supabase.storage
        .from('avatars')
        .update(`${user.MemberId}`, selectedImage, {
          upsert: true,
          cacheControl: '1',
        });

      if (replaceError) {
        // if avatar doesn't exist in bucket, upload it
        const { error } = await supabase.storage
          .from('avatars')
          .upload(`${user.MemberId}`, selectedImage);

        if (error) {
          console.log('upload ERROR: ', error);
        }
      }
    }

    const { data: imageData } = supabase.storage
      .from('avatars')
      .getPublicUrl(`${user.MemberId}`);

    if (imageData) {
      setImageUrl(imageData.publicUrl);
    }

    if (selectedBanner) {
      const { error: replaceError } = await supabase.storage
        .from('banners')
        .update(`${user.MemberId}`, selectedBanner, {
          upsert: true,
          cacheControl: '1',
        });

      if (replaceError) {
        // if avatar doesn't exist in bucket, upload it
        const { error } = await supabase.storage
          .from('banners')
          .upload(`${user.MemberId}`, selectedBanner);

        if (error) {
          console.log('upload ERROR: ', error);
        }
      }
    }

    const { data: bannerData } = supabase.storage
      .from('banners')
      .getPublicUrl(`${user.MemberId}`);

    if (bannerData) {
      setBannerUrl(bannerData.publicUrl);
    }

    const newUser = {
      ...user,
      Name: name,
      DescriptionSection: {
        ...user.DescriptionSection,
        ...aboutMe,
      },
      ServicesSection: {
        ...user.ServicesSection,
        ...services,
      },
      ContactsSection: {
        ...user.ContactsSection,
        ...contact,
      },
      WorkExperienceSection: {
        ...user.WorkExperienceSection,
        ...workExperience,
      },
      ExternalLinksSection: {
        ...user.ExternalLinksSection,
        ...externalLinks,
      },
      ActivitySection: {
        ...user.ActivitySection,
        PrivacySetting: activity
          ? activity.PrivacySetting
          : user.ActivitySection.PrivacySetting,
      },
      Image: imageData ? imageData.publicUrl : '',
      Banner: bannerData ? bannerData.publicUrl : '',
    };

    try {
      const response = await fetch(
        `https://localhost:7297/Profiles/UpdateProfile?memberId=${user.MemberId}&token=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
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

    setLoading(false);
  };

  return (
    <div className="flex flex-col max-w-4xl mx-auto my-12 gap-2">
      {/* <Title />  */}
      {user && (
        <div className="flex flex-col gap-6">
          <BasicInfoSection
            name={name}
            setName={setName}
            email={user.Email}
            imageUrl={imageUrl}
            setSelectedImage={setSelectedImage}
            bannerUrl={bannerUrl}
            setSelectedBanner={setSelectedBanner}
          />
          <ShareProfile memberId={user.MemberId} />
          {aboutMe && (
            <AboutMeSection aboutMe={aboutMe} setAboutMe={setAboutMe} />
          )}
          {services && (
            <HelpSection services={services} setServices={setServices} />
          )}
          {contact && (
            <ContactSection contact={contact} setContact={setContact} />
          )}
          {externalLinks && (
            <ExternalLinksSection
              externalLinks={externalLinks}
              setExternalLinks={setExternalLinks}
            />
          )}
          {workExperience && (
            <WorkExperienceSection
              workExperience={workExperience}
              setWorkExperience={setWorkExperience}
            />
          )}
          {activity && (
            <ActivitySection
              activity={activity}
              setActivity={setActivity}
              isExternal={false}
            />
          )}
          <PrimaryButton type="submit" loading={loading} onClick={handleSubmit}>
            Save changes
          </PrimaryButton>
        </div>
      )}

      <Toaster />
    </div>
  );
};

export default Profile;
