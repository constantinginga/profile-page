import { FC, useEffect, useState } from 'react';
import { Connection } from '../../types/connection';
import { toast } from 'react-hot-toast';

import PrimaryButton from '../../components/primary-button';

type ExternalBasicInfoSectionProps = {
  banner: string | null;
  image: string | null;
  name: string | null;
  connectedId: number;
};

const ExternalBasicInfoSection: FC<ExternalBasicInfoSectionProps> = ({
  banner,
  image,
  name,
  connectedId,
}) => {
  const [isMember, setIsMember] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const memberId = params.get('memberId');
  const token = params.get('token');

  useEffect(() => {
    if (!memberId || !token) {
      setIsMember(false);
      return;
    }

    async function checkToken() {
      const response = await fetch(
        `https://localhost:7297/Profiles/CheckToken?memberId=${memberId}&token=${token}`
      );
      const data = await response.json();

      setIsMember(data.statusCode === 200 ? true : false);
    }

    checkToken();
  }, [memberId, token]);

  useEffect(() => {
    async function checkConnection() {
      if (!memberId || !token || !connectedId) return;

      const connection = {
        MemberId: +memberId,
        ConnectedId: connectedId,
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

      if (data.StatusCode) {
        setIsConnected(false);
      } else {
        setIsConnected(true);
      }
    }

    checkConnection();
  }, [isMember, memberId, token, connectedId]);

  const handleConnect = async () => {
    if (!memberId || !token) return;

    setIsLoading(true);

    const connection = {
      MemberId: +memberId,
      ConnectedId: connectedId,
      Status: false,
    } as Connection;

    const response = await fetch(
      `https://localhost:7297/Profiles/AddConnection?memberId=${memberId}&token=${token}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(connection),
      }
    );
    const data = await response.json();

    if (data.StatusCode === 200) {
      setIsConnected(true);
      toast.success('Connection request sent!', {
        duration: 3000,
      });
    }

    setIsLoading(false);
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-2 flex-col">
        <div className="flex flex-col gap-4 w-full mb-12 relative">
          {banner ? (
            <div
              style={{
                backgroundImage: `url('${banner + '?bust=' + Date.now()}')`,
              }}
              className={`h-72 w-full bg-cover rounded-xl relative`}></div>
          ) : (
            <div
              className={`h-72 w-full bg-[url('https://llakdcvuqyfqiqdrzmld.supabase.co/storage/v1/object/public/banners/placeholder-banner.webp')] bg-cover rounded-xl relative`}></div>
          )}
          <div className="absolute bottom-[-2rem] flex items-center justify-between w-full">
            {image ? (
              <div className="avatar w-fit ml-4">
                <div className="w-20 rounded-full">
                  <img src={`${image}?bust=${Date.now()}`} alt="User avatar" />
                </div>
              </div>
            ) : (
              <div className="avatar placeholder w-fit ml-4">
                <div className="bg-primary text-neutral-content rounded-full w-20"></div>
              </div>
            )}
            {isMember &&
              (isConnected ? (
                <button
                  className="btn btn-primary mr-4 !bg-gray-400 !text-black"
                  disabled>
                  Connection sent
                </button>
              ) : (
                <PrimaryButton
                  type="submit"
                  loading={isLoading}
                  onClick={handleConnect}
                  className="mr-4">
                  + Connect
                </PrimaryButton>
              ))}
          </div>
        </div>
        {name && (
          <div className="flex gap-4">
            <p className="text-xl font-semibold">{name}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExternalBasicInfoSection;
