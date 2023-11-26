import { Link } from 'react-router-dom';
import { MinimalUserData } from '../types/userData';

const MemberProfileCard = ({ user }: { user: MinimalUserData }) => {
  return (
    <div className="card card-compact w-64 bg-base-100 shadow-xl">
      <div className="card-body items-center text-center justify-between">
        <Link
          to={`http://localhost:5173/external-profile/${user.Id}`}
          target="_blank">
          <h2 className="card-title underline break-all">{user.Name}</h2>
        </Link>
      </div>
    </div>
  );
};

export default MemberProfileCard;
