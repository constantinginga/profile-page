import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { MinimalUserData } from '../types/userData';
import { Connection } from '../types/connection';

const ProfileCard = ({ user }: { user: MinimalUserData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    const params = new URLSearchParams(window.location.search);
    const memberId = params.get('memberId');
    const token = params.get('token');

    if (!memberId || !token) return;

    setIsLoading(true);

    const connection = {
      MemberId: +memberId,
      ConnectedId: user.Id,
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
    <div className="card card-compact w-64 bg-base-100 shadow-xl">
      <div className="card-body items-center text-center justify-between">
        <Link
          to={`http://localhost:5173/external-profile/${user.Id}`}
          target="_blank">
          <h2 className="card-title underline break-all">{user.Name}</h2>
        </Link>
        <div className="card-actions">
          {!isConnected ? (
            <button className="btn btn-primary" onClick={handleConnect}>
              {isLoading && (
                <span className="loading loading-spinner">Connect</span>
              )}
              + Connect
            </button>
          ) : (
            <button className="btn btn-primary" disabled>
              Request sent
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
