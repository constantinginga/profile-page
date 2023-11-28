import { FormEvent, FC } from 'react';
import { DescriptionSection } from '../../types/userData';
import TextArea from '../../components/text-area';

type AboutMeSectionProps = {
  aboutMe: DescriptionSection;
  isApproved: boolean;
  setAboutMe: (aboutMe: DescriptionSection) => void;
};

const AboutMeSection: FC<AboutMeSectionProps> = ({
  aboutMe,
  isApproved,
  setAboutMe,
}) => {
  const handleChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setAboutMe({
      ...aboutMe,
      Content: event.currentTarget.value,
    });
  };

  const handlePrivacyChange = () => {
    setAboutMe({
      ...aboutMe,
      PrivacySetting: !aboutMe.PrivacySetting,
    });
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">About me</h2>
        {isApproved && (
          <div className="form-control">
            <label className="label cursor-pointer gap-2">
              <span className="label-text">Is public</span>
              <input
                type="checkbox"
                className="toggle"
                checked={aboutMe.PrivacySetting}
                onChange={handlePrivacyChange}
              />
            </label>
          </div>
        )}
      </div>
      <TextArea
        value={aboutMe.Content}
        onChange={handleChange}
        placeholder="Tell other users a bit about yourself."
      />
    </section>
  );
};

export default AboutMeSection;
