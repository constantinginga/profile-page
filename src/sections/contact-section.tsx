import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

const ContactSection = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) return;

    setUpdatedPhone(
      user.ContactsSection ? user.ContactsSection.PhoneNumber : ''
    );
    setUpdatedContactEmail(
      user.ContactsSection ? user.ContactsSection.Email : ''
    );
  }, [user]);

  const [updatedContactEmail, setUpdatedContactEmail] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');

  const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    setUpdatedContactEmail(event.currentTarget.value);
  };

  const handlePhoneChange = (event: React.FormEvent<HTMLInputElement>) => {
    setUpdatedPhone(event.currentTarget.value);
  };

  return (
    <section className="flex flex-col gap-4 flex-1">
      <h2 className="font-bold text-lg">Contact information</h2>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Email that you want to be contacted at"
          className="input input-bordered max-w-md w-full"
          value={updatedContactEmail}
          onChange={handleEmailChange}
        />
        <input
          type="text"
          placeholder="Phone number that you want to be contacted at"
          className="input input-bordered max-w-md w-full"
          value={updatedPhone}
          onChange={handlePhoneChange}
        />
      </div>
    </section>
  );
};

export default ContactSection;
