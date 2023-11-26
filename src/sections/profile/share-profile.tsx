const ShareProfile = ({ memberId }: { memberId: number }) => {
  return (
    <section className="flex flex-col gap-4 flex-1">
      <h2 className="font-bold text-lg">External profile link</h2>
      <div className="input input-bordered max-w-md w-full flex items-center">
        <span>http://localhost:5173/external-profile/{memberId}</span>
      </div>
    </section>
  );
};

export default ShareProfile;
