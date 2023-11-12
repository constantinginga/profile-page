import { toast } from 'react-hot-toast';

const ShareProfile = ({ memberId }: { memberId: number }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `http://localhost:5173/external-profile/${memberId}`
    );
    toast.success('Profile URL copied to clipboard.', {
      duration: 3000,
    });
  };

  return (
    <section className="flex flex-col gap-4 flex-1">
      <h2 className="font-bold text-lg">Share external profile</h2>
      <div
        className="input input-bordered max-w-md w-full cursor-copy flex items-center"
        onClick={copyToClipboard}>
        <span>http://localhost:5173/external-profile/{memberId}</span>
      </div>
    </section>
  );
};

export default ShareProfile;
