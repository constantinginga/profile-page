import { useState, FormEvent } from 'react';
import TextArea from '../components/text-area';

const HelpSection = ({ help }: { help: string | null }) => {
  const [updatedHelp, setUpdatedHelp] = useState(help || '');

  const handleChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setUpdatedHelp(event.currentTarget.value);
  };

  return (
    <section className="flex flex-col gap-1">
      <h2>What can I help you with?</h2>
      <TextArea
        value={updatedHelp}
        onChange={handleChange}
        placeholder="Describe what services you offer and how you can help others."
      />
    </section>
  );
};

export default HelpSection;
