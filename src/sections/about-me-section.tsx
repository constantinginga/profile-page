import { FormEvent, useState } from 'react';
import TextArea from '../components/text-area';

const AboutMeSection = ({ aboutMe }: { aboutMe: string | null }) => {
  const [updatedAboutMe, setUpdatedAboutMe] = useState(aboutMe || '');

  const handleChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setUpdatedAboutMe(event.currentTarget.value);
  };

  return (
    <section className="flex flex-col gap-1">
      <h2>About me</h2>
      <TextArea
        value={updatedAboutMe}
        onChange={handleChange}
        placeholder="Tell other users a bit about yourself."
      />
    </section>
  );
};

export default AboutMeSection;
