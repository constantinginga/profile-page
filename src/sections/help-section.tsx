import { FC, FormEvent } from 'react';
import TextArea from '../components/text-area';

type HelpSectionProps = {
  services: string;
  setServices: (services: string) => void;
};

const HelpSection: FC<HelpSectionProps> = ({ services, setServices }) => {
  const handleChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setServices(event.currentTarget.value);
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-bold text-lg">What can I help you with?</h2>
      <TextArea
        value={services}
        onChange={handleChange}
        placeholder="Describe what services you offer and how you can help others."
      />
    </section>
  );
};

export default HelpSection;
