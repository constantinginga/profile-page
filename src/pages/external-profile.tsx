import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { UserData } from '../types/userData';
import { Activity } from '../types/activity';
import ExternalDescriptionSection from '../sections/external-profile/description-section';
import ExternalBasicInfoSection from '../sections/external-profile/basic-info-section';
import ServicesSection from '../sections/external-profile/services-section';
import ExternalContactSection from '../sections/external-profile/external-contact-section';
import PublicLinksSection from '../sections/external-profile/public-links-section';
import ExternalWorkExperienceSection from '../sections/external-profile/external-work-experience-section';
import ActivitySection from '../sections/profile/activity-section';

const ExternalProfile = () => {
  const { id } = useParams();

  const [user, setUser] = useState<UserData | null>(null);
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchProfile() {
      const response = await fetch(
        `https://localhost:7297/Profiles/GetExternalProfile?memberId=${id}`
      );
      const data = await response.json();

      setUser(data.member as UserData);
      setActivity(data.activitySection as Activity);
    }

    fetchProfile();
  }, [id]);

  return (
    user && (
      <div className="flex flex-col max-w-4xl mx-auto my-12 gap-2">
        <div className="flex flex-col gap-6">
          <ExternalBasicInfoSection
            name={user.Name}
            banner={user.Banner}
            image={user.Image}
            connectedId={user.MemberId}
          />
          {user.DescriptionSection && user.DescriptionSection.Content && (
            <ExternalDescriptionSection
              description={user.DescriptionSection.Content}
            />
          )}
          {user.ServicesSection && user.ServicesSection.Content && (
            <ServicesSection services={user.ServicesSection.Content} />
          )}
          {user.ContactsSection &&
            (user.ContactsSection.Email ||
              user.ContactsSection.PhoneNumber) && (
              <ExternalContactSection
                phone={user.ContactsSection.PhoneNumber}
                email={user.ContactsSection.Email}
              />
            )}
          {user.ExternalLinksSection &&
            user.ExternalLinksSection.ExternalLinks.length > 0 && (
              <PublicLinksSection
                externalLinks={user.ExternalLinksSection.ExternalLinks}
              />
            )}
          {user.WorkExperienceSection &&
            user.WorkExperienceSection.WorkExperiences.length > 0 && (
              <ExternalWorkExperienceSection
                workExperience={user.WorkExperienceSection.WorkExperiences}
              />
            )}

          {activity && (
            <ActivitySection activity={activity} isExternal={true} />
          )}
        </div>
        <Toaster />
      </div>
    )
  );
};

export default ExternalProfile;
