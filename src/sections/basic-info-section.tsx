import { useState, FormEvent } from 'react';

const BasicInfoSection = ({ name }: { name: string | null }) => {
  const [updatedName, setUpdatedName] = useState(name || '');

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setUpdatedName(event.currentTarget.value);
  };

  return (
    <section className="flex flex-col gap-1">
      <h2>Basic information</h2>
      <div className="flex flex-col gap-2">
        <span>FIGURE OUT HOW TO DO PROFILE PIC HERE</span>
        <input
          type="text"
          placeholder="Your name"
          className="input input-bordered max-w-md w-full"
          value={updatedName}
          onChange={handleChange}
        />
      </div>
    </section>
  );
};

export default BasicInfoSection;
