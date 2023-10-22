import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Toaster, toast } from 'react-hot-toast';

import { ResponseType } from '../types/responseType';

import PrimaryButton from '../components/primary-button';
import AboutMeSection from '../sections/about-me-section';
import Title from '../components/title';
import BasicInfoSection from '../sections/basic-info-section';
import HelpSection from '../sections/help-section';
import ContactSection from '../sections/contact-section';
import WorkExperienceSection from '../sections/work-experience-section';
// import ExternalLinksSection from '../sections/external-links-section';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const [name, setName] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [services, setServices] = useState('');
  const [phone, setPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  useEffect(() => {
    if (!user) return;

    setName(user.Name ? user.Name : '');
    setAboutMe(user.DescriptionSection ? user.DescriptionSection.Content : '');
    setServices(user.ServicesSection ? user.ServicesSection.Content : '');
    setPhone(user.ContactsSection ? user.ContactsSection.PhoneNumber : '');
    setContactEmail(user.ContactsSection ? user.ContactsSection.Email : '');
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);

    if (!user) return;

    // validate for empty fields
    if (!name || !aboutMe || !services || !phone || !contactEmail) {
      setLoading(false);
      toast.error('Please fill out all fields');
      return;
    }

    console.log('Current user: ', user.DescriptionSection);

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
    };

    console.log('New user: ', newUser.DescriptionSection);

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
      <Title />
      {user && (
        <div className="flex flex-col gap-6">
          <BasicInfoSection name={name} setName={setName} email={user.Email} />
          <AboutMeSection aboutMe={aboutMe} setAboutMe={setAboutMe} />
          <HelpSection services={services} setServices={setServices} />
          <div className="flex gap-8">
            <ContactSection
              phone={phone}
              setPhone={setPhone}
              contactEmail={contactEmail}
              setContactEmail={setContactEmail}
            />
            {/* <ExternalLinksSection /> */}
          </div>
          <WorkExperienceSection />
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
