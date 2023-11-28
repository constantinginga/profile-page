import { FC } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import { ContactsSection } from '../../types/userData';

type ContactSectionProps = {
  contact: ContactsSection;
  isApproved: boolean;
  setContact: (contact: ContactsSection) => void;
};

const ContactSection: FC<ContactSectionProps> = ({
  contact,
  isApproved,
  setContact,
}) => {
  const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    setContact({
      ...contact,
      Email: event.currentTarget.value,
    });
  };

  const handlePhoneChange = (value: string) => {
    setContact({
      ...contact,
      PhoneNumber: value,
    });
  };

  const handlePrivacyChange = () => {
    setContact({
      ...contact,
      PrivacySetting: !contact.PrivacySetting,
    });
  };

  return (
    <section className="flex flex-col gap-4 flex-1">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">Contact information</h2>
        {isApproved && (
          <div className="form-control">
            <label className="label cursor-pointer gap-2">
              <span className="label-text">Is public</span>
              <input
                type="checkbox"
                className="toggle"
                checked={contact.PrivacySetting}
                onChange={handlePrivacyChange}
              />
            </label>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Email that you want to be contacted at"
          className="input input-bordered max-w-md w-full"
          value={contact.Email}
          onChange={handleEmailChange}
        />
        <PhoneInput
          defaultCountry="DK"
          placeholder="Phone number that you want to be contacted at"
          className="input input-bordered max-w-md w-full"
          value={contact.PhoneNumber}
          onChange={handlePhoneChange}
        />
      </div>
    </section>
  );
};

export default ContactSection;
