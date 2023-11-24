import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { UserData } from '../types/userData';
import { Connection } from '../types/connection';
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
  const [isMember, setIsMember] = useState<boolean>(false);
  const [connection, setConnection] = useState<Connection | null>(null);
  const params = new URLSearchParams(window.location.search);
  const memberId = params.get('memberId');
  const token = params.get('token');

  useEffect(() => {
    if (!id) return;

    async function fetchProfile() {
      console.log(id, memberId, token);

      const response = await fetch(
        !isMember
          ? `https://localhost:7297/Profiles/GetExternalProfile?memberIdToView=${id}`
          : `https://localhost:7297/Profiles/GetExternalProfile?memberIdToView=${id}&authId=${memberId}&token=${token}`
      );
      const data = await response.json();

      console.log(data);

      setUser(data.member as UserData);
      setActivity(data.activitySection as Activity);
    }

    fetchProfile();
  }, [id, memberId, token, isMember]);

  useEffect(() => {
    if (!memberId || !token) {
      return;
    }

    async function checkToken() {
      const response = await fetch(
        `https://localhost:7297/Profiles/CheckToken?memberId=${memberId}&token=${token}`
      );
      const data = await response.json();

      if (data.statusCode === 200) {
        setIsMember(true);
      }
    }

    checkToken();
  }, [memberId, token]);

  useEffect(() => {
    async function checkConnection() {
      if (!memberId || !token || !user?.MemberId) return;

      const connection = {
        MemberId: +memberId,
        ConnectedId: user.MemberId,
      } as Connection;

      const response = await fetch(
        `https://localhost:7297/Profiles/CheckMemberConnection?memberId=${memberId}&token=${token}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(connection),
        }
      );
      const data = await response.json();

      console.log(data);

      setConnection(data);
    }

    checkConnection();
  }, [isMember, memberId, token, user?.MemberId]);

  return (
    user && (
      <div className="flex flex-col max-w-4xl mx-auto my-12 gap-2">
        <div className="flex flex-col gap-6">
          <ExternalBasicInfoSection
            name={user.Name}
            banner={user.Banner}
            image={user.Image}
            connectedId={user.MemberId}
            isMember={isMember}
            connection={connection}
            setConnection={setConnection}
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
