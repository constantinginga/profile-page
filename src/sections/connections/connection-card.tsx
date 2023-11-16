import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ConnectionContext } from '../../context/ConnectionContext';
import { ConnectionWithProfile } from '../../types/connection';

type ConnectionCardProps = {
  request: ConnectionWithProfile;
  isRequest: boolean;
};

const ConnectionCard: FC<ConnectionCardProps> = ({ request, isRequest }) => {
  const { acceptRequest, declineRequest } = useContext(ConnectionContext);
  return (
    <div className="card card-compact w-56 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        {request.Image ? (
          <div className="avatar w-fit ml-4">
            <div className="w-20 rounded-full">
              <img
                src={`${request.Image}?bust=${Date.now()}`}
                alt="User avatar"
              />
            </div>
          </div>
        ) : (
          <div className="avatar placeholder w-fit ml-4">
            <div className="bg-primary text-neutral-content rounded-full w-20"></div>
          </div>
        )}
      </figure>
      <div className="card-body items-center text-center">
        <Link
          to={`http://localhost:5173/external-profile/${request.connection.MemberId}`}
          target="_blank">
          <h2 className="card-title underline">{request.Name}</h2>
        </Link>
        {isRequest ? (
          <div className="card-actions">
            <button
              className="btn btn-primary"
              onClick={() => acceptRequest(request)}>
              Accept
            </button>
            <button
              className="btn btn-outline btn-error"
              onClick={() => declineRequest(request.connection)}>
              Decline
            </button>
          </div>
        ) : (
          <div className="card-actions">
            <button
              className="btn btn-error"
              onClick={() => declineRequest(request.connection)}>
              Remove connection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionCard;
