import { FC, useState } from 'react';

type ContactSectionProps = {
  contactEmail: string | null;
  phone: string | null;
};

const ContactSection: FC<ContactSectionProps> = ({ contactEmail, phone }) => {
  const [updatedContactEmail, setUpdatedContactEmail] = useState(
    contactEmail || ''
  );
  const [updatedPhone, setUpdatedPhone] = useState(phone || '');

  const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    setUpdatedContactEmail(event.currentTarget.value);
  };

  const handlePhoneChange = (event: React.FormEvent<HTMLInputElement>) => {
    setUpdatedPhone(event.currentTarget.value);
  };

  return (
    <section className="flex flex-col gap-1">
      <h2>Contact information</h2>
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
