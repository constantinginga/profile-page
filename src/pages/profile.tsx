import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

import PrimaryButton from '../components/primary-button';
import AboutMeSection from '../sections/about-me-section';
import Title from '../components/title';
import BasicInfoSection from '../sections/basic-info-section';
import HelpSection from '../sections/help-section';

import { UserData } from '../types/userData';
// import { ProfileResponse } from '../types/profileResponse';
import ContactSection from '../sections/contact-section';
import WorkExperienceSection from '../sections/work-experience-section';

const Profile = () => {
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  const [updatedUser, setUpdatedUser] = useState<UserData | null>(user);

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleSubmit = async () => {
    // THIS NEEDS TO BE UPDATED

    // if (!aboutMe || !aboutMe.trim()) return;

    // setLoading(true);
    // const descriptionObject: DescriptionObject = {
    //   MemberId: 1731,
    //   Description: aboutMe,
    // };
    // fetch to API
    // const response: ProfileResponse = await fetch(
    //   'https://localhost:7297/Profiles/SetProfileDescription',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(descriptionObject),
    //   }
    // ).then((response) => response.json());

    // console.log(response);

    // setUpdatedUser()
    setLoading(false);
  };

  return (
    <div className="flex flex-col max-w-4xl mx-auto mt-12 gap-2">
      <Title />
      {updatedUser && (
        <div className="flex flex-col gap-6">
          <BasicInfoSection />
          <AboutMeSection />
          <HelpSection />
          <ContactSection />
          <WorkExperienceSection />
          <PrimaryButton type="submit" loading={loading} onClick={handleSubmit}>
            Save changes
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default Profile;
