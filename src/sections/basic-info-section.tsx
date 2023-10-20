import { useEffect, useState, useContext, FormEvent } from 'react';
import { UserContext } from '../context/UserContext';

const BasicInfoSection = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) return;

    setUpdatedName(user.Name ? user.Name : '');
    setUserEmail(user.Email);
  }, [user]);

  const [updatedName, setUpdatedName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setUpdatedName(event.currentTarget.value);
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-bold text-lg">Basic information</h2>
      <div className="flex flex-col gap-2">
        <span>FIGURE OUT HOW TO DO PROFILE PIC HERE</span>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your name"
            className="input input-bordered max-w-md w-full"
            value={updatedName}
            onChange={handleChange}
          />
          <input
            className="input input-bordered max-w-md w-full"
            type="email"
            value={userEmail}
            disabled
          />
        </div>
      </div>
    </section>
  );
};

export default BasicInfoSection;
