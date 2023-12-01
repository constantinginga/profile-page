import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Toaster } from 'react-hot-toast';
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
  const [loading, setLoading] = useState(false);
  const {
    user,
    updateProfile,
    activity,
    setImage,
    setBanner,
    isApproved,
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

    if (!user) return;

    if (selectedImage) {
      setImage(selectedImage);
    }

    if (selectedBanner) {
      setBanner(selectedBanner);
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
    };

    await updateProfile(newUser);

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
            <AboutMeSection
              aboutMe={aboutMe}
              setAboutMe={setAboutMe}
              isApproved={isApproved}
            />
          )}
          {services && (
            <HelpSection
              services={services}
              setServices={setServices}
              isApproved={isApproved}
            />
          )}
          {contact && (
            <ContactSection
              contact={contact}
              setContact={setContact}
              isApproved={isApproved}
            />
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
              isApproved={isApproved}
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
