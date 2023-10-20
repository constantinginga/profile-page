import { FormEvent, useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import TextArea from '../components/text-area';

const AboutMeSection = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) return;

    setUpdatedAboutMe(
      user.DescriptionSection ? user.DescriptionSection.Content : ''
    );
  }, [user]);

  const [updatedAboutMe, setUpdatedAboutMe] = useState('');

  const handleChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setUpdatedAboutMe(event.currentTarget.value);
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-bold text-lg">About me</h2>
      <TextArea
        value={updatedAboutMe}
        onChange={handleChange}
        placeholder="Tell other users a bit about yourself."
      />
    </section>
  );
};

export default AboutMeSection;
