import { Toaster } from 'react-hot-toast';
import FindConnections from '../sections/connections/find-connections';

const Users = () => {
  return (
    <div className="flex flex-col max-w-4xl mx-auto my-12 gap-2">
      <div className="flex flex-col gap-6 w-fit">
        <h1>Find other users</h1>
        <div className="flex gap-4">
          <FindConnections isMember={false} />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Users;
