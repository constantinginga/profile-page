import { FC } from 'react';
import { WorkExperience } from '../../types/userData';

type ExternalWorkExperienceSectionProps = {
  workExperience: WorkExperience[];
};

const ExternalWorkExperienceSection: FC<ExternalWorkExperienceSectionProps> = ({
  workExperience,
}) => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-bold text-lg">Work experience</h2>
      <div className="flex flex-col gap-6">
        {workExperience.map((experience, index) => (
          <div
            className="flex flex-col gap-2 bg-base-200 p-4 rounded-xl shadow-xl"
            key={index}>
            <p className="font-semibold">{experience.CompanyName}</p>
            <p className="text-sm">
              {new Date(experience.StartDate).toDateString()} -{' '}
              {!experience.EndDate
                ? 'present'
                : new Date(experience.EndDate).toDateString()}
            </p>
            <p>Position: {experience.Position}</p>
            <p>{experience.PositionDescription}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExternalWorkExperienceSection;
