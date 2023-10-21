import { FormEvent, FC } from 'react';

type BasicInfoSectionProps = {
  name: string;
  setName: (name: string) => void;
  email: string;
};

const BasicInfoSection: FC<BasicInfoSectionProps> = ({
  name,
  setName,
  email,
}) => {
  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-bold text-lg">Basic information</h2>
      <div className="flex flex-col gap-2">
        <span>FIGURE OUT HOW TO DO PROFILE PIC HERE</span>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your name"
            className="input input-bordered max-w-md w-full"
            value={name}
            onChange={handleChange}
          />
          <input
            className="input input-bordered max-w-md w-full"
            type="email"
            value={email}
            disabled
          />
        </div>
      </div>
    </section>
  );
};

export default BasicInfoSection;
