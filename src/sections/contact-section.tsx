import { FC } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

type ContactSectionProps = {
  phone: string;
  setPhone: (phone: string) => void;
  contactEmail: string;
  setContactEmail: (contactEmail: string) => void;
};

const ContactSection: FC<ContactSectionProps> = ({
  phone,
  setPhone,
  contactEmail,
  setContactEmail,
}) => {
  const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    setContactEmail(event.currentTarget.value);
  };

  // const handlePhoneChange = (event: any) => {
  //   setPhone(event.currentTarget.value);
  // };

  return (
    <section className="flex flex-col gap-4 flex-1">
      <h2 className="font-bold text-lg">Contact information</h2>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Email that you want to be contacted at"
          className="input input-bordered max-w-md w-full"
          value={contactEmail}
          onChange={handleEmailChange}
        />
        <PhoneInput
          defaultCountry="DK"
          placeholder="Phone number that you want to be contacted at"
          className="input input-bordered max-w-md w-full"
          value={phone}
          onChange={setPhone}
        />
      </div>
    </section>
  );
};

export default ContactSection;
