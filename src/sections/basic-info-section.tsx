import { FormEvent, FC, ChangeEvent } from 'react';

type BasicInfoSectionProps = {
  name: string;
  setName: (name: string) => void;
  email: string;
  imageUrl: string | null;
  setSelectedImage: (image: File | null) => void;
};

const BasicInfoSection: FC<BasicInfoSectionProps> = ({
  name,
  setName,
  email,
  imageUrl,
  setSelectedImage,
}) => {
  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-bold text-lg">Basic information</h2>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4 mb-4">
          {imageUrl ? (
            <div className="avatar">
              <div className="w-20 rounded-full">
                <img src={`${imageUrl}?bust=${Date.now()}`} alt="User avatar" />
              </div>
            </div>
          ) : (
            <div className="avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-20">
                <span className="text-3xl">{name[0]}</span>
              </div>
            </div>
          )}
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-sm"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
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
