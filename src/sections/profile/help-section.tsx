import { FC, FormEvent } from 'react';
import { ServicesSection } from '../../types/userData';
import TextArea from '../../components/text-area';

type HelpSectionProps = {
  services: ServicesSection;
  setServices: (services: ServicesSection) => void;
};

const HelpSection: FC<HelpSectionProps> = ({ services, setServices }) => {
  const handleChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setServices({
      ...services,
      Content: event.currentTarget.value,
    });
  };

  const handlePrivacyChange = () => {
    setServices({
      ...services,
      PrivacySetting: !services.PrivacySetting,
    });
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">What can I help you with?</h2>
        <div className="form-control">
          <label className="label cursor-pointer gap-2">
            <span className="label-text">Is public</span>
            <input
              type="checkbox"
              className="toggle"
              checked={services.PrivacySetting}
              onChange={handlePrivacyChange}
            />
          </label>
        </div>
      </div>
      <TextArea
        value={services.Content}
        onChange={handleChange}
        placeholder="Describe what services you offer and how you can help others."
      />
    </section>
  );
};

export default HelpSection;
