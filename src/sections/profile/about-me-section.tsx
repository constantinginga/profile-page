import { FormEvent, FC } from 'react';
import TextArea from '../../components/text-area';

type AboutMeSectionProps = {
  aboutMe: string;
  setAboutMe: (aboutMe: string) => void;
};

const AboutMeSection: FC<AboutMeSectionProps> = ({ aboutMe, setAboutMe }) => {
  const handleChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setAboutMe(event.currentTarget.value);
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-bold text-lg">About me</h2>
      <TextArea
        value={aboutMe}
        onChange={handleChange}
        placeholder="Tell other users a bit about yourself."
      />
    </section>
  );
};

export default AboutMeSection;
