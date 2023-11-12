import { useEffect, useState, useContext } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserContext } from '../context/UserContext';
import { Toaster, toast } from 'react-hot-toast';

import { ResponseType } from '../types/responseType';
import { WorkExperience, ExternalLink } from '../types/userData';

import PrimaryButton from '../components/primary-button';
import AboutMeSection from '../sections/about-me-section';
import BasicInfoSection from '../sections/basic-info-section';
import HelpSection from '../sections/help-section';
import ContactSection from '../sections/contact-section';
import WorkExperienceSection from '../sections/work-experience-section';
import ExternalLinksSection from '../sections/external-links-section';

const Profile = () => {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const [name, setName] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [services, setServices] = useState('');
  const [phone, setPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
  const [externalLinks, setExternalLinks] = useState<ExternalLink[]>([]);
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
    setAboutMe(user.DescriptionSection ? user.DescriptionSection.Content : '');
    setServices(user.ServicesSection ? user.ServicesSection.Content : '');
    setPhone(user.ContactsSection ? user.ContactsSection.PhoneNumber : '');
    setContactEmail(user.ContactsSection ? user.ContactsSection.Email : '');
    setWorkExperience(
      user.WorkExperienceSection
        ? user.WorkExperienceSection.WorkExperiences
        : []
    );
    setExternalLinks(
      user.ExternalLinksSection ? user.ExternalLinksSection.ExternalLinks : []
    );
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);

    if (!user || !supabase) return;

    // validate for empty fields
    if (!name || !aboutMe || !services || !phone || !contactEmail) {
      setLoading(false);
      toast.error('Please fill out all fields');
      return;
    }

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
        Content: aboutMe,
      },
      ServicesSection: {
        ...user.ServicesSection,
        Content: services,
      },
      ContactsSection: {
        ...user.ContactsSection,
        PhoneNumber: phone,
        Email: contactEmail,
      },
      WorkExperienceSection: {
        ...user.WorkExperienceSection,
        WorkExperiences: workExperience,
      },
      ExternalLinksSection: {
        ...user.ExternalLinksSection,
        ExternalLinks: externalLinks,
      },
      Image: imageData ? imageData.publicUrl : '',
      Banner: bannerData ? bannerData.publicUrl : '',
    };

    console.log('New external links: ', newUser);

    try {
      const response = await fetch(
        `https://localhost:7297/Profiles/UpdateProfile`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        }
      );
      const data: ResponseType = await response.json();

      console.log(data);

      if (data.statusCode === 200) {
        toast.success('Profile updated successfully');
      } else {
        toast.error('Something went wrong');
      }
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
          <AboutMeSection aboutMe={aboutMe} setAboutMe={setAboutMe} />
          <HelpSection services={services} setServices={setServices} />
          <ContactSection
            phone={phone}
            setPhone={setPhone}
            contactEmail={contactEmail}
            setContactEmail={setContactEmail}
          />
          <ExternalLinksSection
            externalLinks={externalLinks}
            setExternalLinks={setExternalLinks}
          />
          <WorkExperienceSection
            workExperience={workExperience}
            setWorkExperience={setWorkExperience}
          />
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
