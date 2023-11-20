import { FormEvent, FC, ChangeEvent, useRef, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-hot-toast';

type BasicInfoSectionProps = {
  name: string;
  email: string;
  imageUrl: string | null;
  bannerUrl: string | null;
  setName: (name: string) => void;
  setSelectedImage: (image: File | null) => void;
  setSelectedBanner: (banner: File | null) => void;
};

const BasicInfoSection: FC<BasicInfoSectionProps> = ({
  name,
  setName,
  email,
  bannerUrl,
  imageUrl,
  setSelectedImage,
  setSelectedBanner,
}) => {
  const { completionScore } = useContext(UserContext);
  const avatarInput = useRef<HTMLInputElement>(null);
  const bannerInput = useRef<HTMLInputElement>(null);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      toast.success('Avatar uploaded. Please save your changes.', {
        duration: 4000,
      });
    }
  };

  const handleBannerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedBanner(file);
      toast.success('Banner uploaded. Please save your changes.', {
        duration: 4000,
      });
    }
  };

  const triggerAvatarUpload = () => {
    avatarInput.current?.click();
  };

  const triggerBannerUpload = () => {
    bannerInput.current?.click();
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-2 flex-col">
        <div className="flex flex-col gap-4 w-full mb-12 relative">
          {bannerUrl ? (
            <div
              style={{
                backgroundImage: `url('${bannerUrl + '?bust=' + Date.now()}')`,
              }}
              className={`h-72 w-full bg-cover rounded-xl cursor-pointer relative group`}
              onClick={triggerBannerUpload}>
              <div className="bg-black/70 rounded-xl w-full h-full absolute opacity-0 group-hover:opacity-100" />
            </div>
          ) : (
            <div
              className={`h-72 w-full bg-[url('https://llakdcvuqyfqiqdrzmld.supabase.co/storage/v1/object/public/banners/placeholder-banner.webp')] bg-cover rounded-xl cursor-pointer relative group`}
              onClick={triggerBannerUpload}>
              <div className="bg-black/70 rounded-xl w-full h-full absolute opacity-0 group-hover:opacity-100" />
            </div>
          )}
          {imageUrl ? (
            <div
              className="avatar cursor-pointer absolute group transition-all w-fit ml-4 bottom-[-2rem]"
              onClick={triggerAvatarUpload}>
              <div className="bg-black/70 rounded-full w-full absolute opacity-0 group-hover:opacity-100" />
              <div className="w-20 rounded-full">
                <img src={`${imageUrl}?bust=${Date.now()}`} alt="User avatar" />
              </div>
            </div>
          ) : (
            <div
              className="avatar placeholder cursor-pointer absolute group transition-all w-fit ml-4 bottom-[-2rem]"
              onClick={triggerAvatarUpload}>
              <div className="bg-black/70 rounded-full w-full absolute opacity-0 group-hover:opacity-100" />
              <div className="bg-primary text-neutral-content rounded-full w-20"></div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 mb-2">
          <p>Completion score: {completionScore}%</p>
          <div
            className="tooltip cursor-pointer"
            data-tip="Complete all sections of your profile to get 100% completion score">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1.25em"
              width="1.25em"
              xmlns="http://www.w3.org/2000/svg">
              <g id="Circle_Info">
                <g>
                  <g>
                    <path d="M11.5,15a.5.5,0,0,0,1,0h0V10.981a.5.5,0,0,0-1,0Z"></path>
                    <circle cx="12" cy="8.999" r="0.5"></circle>
                  </g>
                  <path d="M12,2.065A9.934,9.934,0,1,1,2.066,12,9.945,9.945,0,0,1,12,2.065Zm0,18.867A8.934,8.934,0,1,0,3.066,12,8.944,8.944,0,0,0,12,20.932Z"></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div className="flex gap-4">
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
      <input
        type="file"
        ref={avatarInput}
        className="hidden"
        accept="image/*"
        onChange={handleAvatarChange}
      />

      <input
        type="file"
        ref={bannerInput}
        className="hidden"
        accept="image/*"
        onChange={handleBannerChange}
      />
    </section>
  );
};

export default BasicInfoSection;
