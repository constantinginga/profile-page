import { FormEvent, useState } from 'react';
import { DescriptionObject } from '../types/descriptionObject';
import { ProfileResponse } from '../types/profileResponse';

const AboutMeSection = () => {
  const [aboutMe, setAboutMe] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setAboutMe(event.currentTarget.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!aboutMe || !aboutMe.trim()) return;

    setLoading(true);
    const descriptionObject: DescriptionObject = {
      MemberId: 1731,
      Description: aboutMe,
    };
    // fetch to API
    const response: ProfileResponse = await fetch(
      'https://localhost:7297/Profiles/SetProfileDescription',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(descriptionObject),
      }
    ).then((response) => response.json());

    console.log(response);

    setAboutMe('');
    setLoading(false);
  };

  return (
    <section className="max-w-2xl mx-auto mt-12">
      <h2>About me</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="textarea textarea-bordered resize-none"
          placeholder="I am..."
          value={aboutMe}
          onChange={handleChange}></textarea>
        <button
          type="submit"
          className="btn btn-primary w-fit text-neutral"
          disabled={loading}>
          {loading ? (
            <>
              <span className="loading loading-spinner"></span>
              Save
            </>
          ) : (
            <span>Save</span>
          )}
        </button>
      </form>
    </section>
  );
};

export default AboutMeSection;
