import { useState, useEffect, useContext } from 'react';
import { WorkExperience } from '../types/userData';
import { UserContext } from '../context/UserContext';

const WorkExperienceSection = () => {
  const { user } = useContext(UserContext);
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);

  useEffect(() => {
    if (!user) return;
    if (user.WorkExperienceSection) {
      setWorkExperience(user.WorkExperienceSection.WorkExperiences);
    }
  }, [user]);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-bold text-lg">Work experience</h2>
      <div>
        {workExperience.map((experience, index) => (
          <div
            className="flex flex-col gap-2 bg-base-200 p-4 rounded-xl shadow-xl"
            key={index}>
            <p className="font-semibold">{experience.CompanyName}</p>
            <p className="text-sm">
              {new Date(experience.StartDate).toDateString()} -{' '}
              {!experience.EndDate ? 'present' : experience.EndDate}
            </p>
            <p>Position: {experience.Position}</p>
            <p>{experience.PositionDescription}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkExperienceSection;
