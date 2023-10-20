import { useState, FormEvent, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import TextArea from '../components/text-area';

const HelpSection = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) return;

    setUpdatedHelp(user.ServicesSection ? user.ServicesSection.Content : '');
  }, [user]);

  const [updatedHelp, setUpdatedHelp] = useState('');

  const handleChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setUpdatedHelp(event.currentTarget.value);
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-bold text-lg">What can I help you with?</h2>
      <TextArea
        value={updatedHelp}
        onChange={handleChange}
        placeholder="Describe what services you offer and how you can help others."
      />
    </section>
  );
};

export default HelpSection;
