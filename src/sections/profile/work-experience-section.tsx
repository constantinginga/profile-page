import { useState, FC, useContext, FormEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WorkExperience } from '../../types/userData';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-hot-toast';

type WorkExperienceSectionProps = {
  workExperience: WorkExperience[];
  setWorkExperience: (workExperience: WorkExperience[]) => void;
};

type TFormFields = {
  companyName: string;
  position: string;
  positionDescription: string;
  startDate: string;
  endDate: string;
};

const defaultFormFields: TFormFields = {
  companyName: '',
  position: '',
  positionDescription: '',
  startDate: '',
  endDate: '',
};

const WorkExperienceSection: FC<WorkExperienceSectionProps> = ({
  workExperience,
  setWorkExperience,
}) => {
  const { user } = useContext(UserContext);
  const [formFields, setFormFields] = useState<TFormFields>(defaultFormFields);
  const [selectedWorkExperienceId, setSelectedWorkExperienceId] = useState<
    string | null
  >(null);
  const { companyName, position, positionDescription, startDate, endDate } =
    formFields;

  const openModal = () => {
    setSelectedWorkExperienceId(null);
    setFormFields(defaultFormFields);
    window.new_work_experience.showModal();
  };

  const handleChange = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleCreateWorkExperience = () => {
    if (!user) return;

    // check for empty fields
    if (!companyName || !position || !positionDescription || !startDate) {
      toast.error('Please fill out all fields');
      return;
    }

    // check that endDate is after startDate
    if (endDate && new Date(endDate) < new Date(startDate)) {
      toast.error('End date must be after start date');
      return;
    }

    window.new_work_experience.close();

    const newWorkExperience: WorkExperience = {
      WorkExperienceId: uuidv4(),
      MemberId: user.MemberId,
      CompanyName: companyName,
      Position: position,
      PositionDescription: positionDescription,
      StartDate: startDate,
      EndDate: endDate ? endDate : null,
    };

    setWorkExperience([...workExperience, newWorkExperience]);

    toast.success('Successfully added. Please save your changes.');

    // reset form fields
    setFormFields(defaultFormFields);
  };

  const handleRemoveWorkExperience = (experience: WorkExperience) => {
    const result = confirm(
      'Are you sure you want to remove this work experience?'
    );

    if (!result) return;

    const newWorkExperience = workExperience.filter(
      (exp) => exp.WorkExperienceId !== experience.WorkExperienceId
    );

    setWorkExperience(newWorkExperience);

    toast.success('Successfully removed. Please save your changes.', {
      duration: 5000,
    });
  };

  const openEditModal = (experience: WorkExperience) => {
    setFormFields({
      companyName: experience.CompanyName,
      position: experience.Position,
      positionDescription: experience.PositionDescription,
      // convert to yyyy-mm-dd format for input type date
      startDate: experience.StartDate.split('T')[0],
      endDate: experience.EndDate ? experience.EndDate.split('T')[0] : '',
    });

    setSelectedWorkExperienceId(experience.WorkExperienceId);

    window.new_work_experience.showModal();
  };

  const handleEditWorkExperience = () => {
    if (!user) return;

    // check for empty fields
    if (!companyName || !position || !positionDescription || !startDate) {
      toast.error('Please fill out all fields');
      return;
    }

    // check that endDate is after startDate
    if (endDate && new Date(endDate) < new Date(startDate)) {
      toast.error('End date must be after start date');
      return;
    }

    window.new_work_experience.close();

    if (!selectedWorkExperienceId) return;

    const newWorkExperience: WorkExperience = {
      WorkExperienceId: selectedWorkExperienceId,
      MemberId: user.MemberId,
      CompanyName: companyName,
      Position: position,
      PositionDescription: positionDescription,
      StartDate: startDate,
      EndDate: endDate ? endDate : null,
    };

    const newWorkExperienceList = workExperience.map((experience) => {
      if (experience.WorkExperienceId === selectedWorkExperienceId) {
        return newWorkExperience;
      }

      return experience;
    });

    setWorkExperience(newWorkExperienceList);

    toast.success('Successfully updated. Please save your changes.');

    // reset form fields
    setFormFields(defaultFormFields);
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">Work experience</h2>
        <button
          className="btn btn-sm btn-primary btn-outline w-fit my-4"
          onClick={openModal}>
          + New work experience
        </button>
      </div>
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

            <div className="flex gap-2 items-center mt-2">
              <button
                className="btn btn-sm btn-error w-fit"
                onClick={() => handleRemoveWorkExperience(experience)}>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="1.25em"
                  width="1.25em"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
                </svg>
                <span>Remove</span>
              </button>
              <button
                className="btn btn-sm w-fit btn-accent"
                onClick={() => openEditModal(experience)}>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1.25em"
                  width="1.25em"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z"></path>
                </svg>
                <span>Edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <dialog id="new_work_experience" className="modal">
        <div className="modal-box flex flex-col gap-4">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">
            {selectedWorkExperienceId !== null
              ? 'Update work experience'
              : 'New work experience'}
          </h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Company name"
              className="input input-bordered"
              name="companyName"
              onChange={handleChange}
              value={companyName}
            />
            <input
              type="text"
              placeholder="Position"
              className="input input-bordered"
              name="position"
              onChange={handleChange}
              value={position}
            />
            <textarea
              className="textarea textarea-bordered resize-none h-20"
              placeholder="Position description"
              name="positionDescription"
              value={positionDescription}
              onChange={handleChange}
            />
            <div className="flex gap-4">
              <input
                type="date"
                placeholder="Start date"
                className="input input-bordered"
                name="startDate"
                value={startDate}
                onChange={handleChange}
              />
              <input
                type="date"
                placeholder="End date (optional)"
                className="input input-bordered"
                name="endDate"
                value={endDate}
                onChange={handleChange}
              />
            </div>
          </div>
          {selectedWorkExperienceId !== null ? (
            <button
              className="btn btn-primary mt-4"
              onClick={handleEditWorkExperience}>
              Update
            </button>
          ) : (
            <button
              className="btn btn-primary mt-4"
              onClick={handleCreateWorkExperience}>
              Create
            </button>
          )}
        </div>
      </dialog>
    </section>
  );
};

export default WorkExperienceSection;
