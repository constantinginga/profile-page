import { FC } from 'react';

type ExternalBasicInfoSectionProps = {
  banner: string | null;
  image: string | null;
  name: string | null;
};

const ExternalBasicInfoSection: FC<ExternalBasicInfoSectionProps> = ({
  banner,
  image,
  name,
}) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-2 flex-col">
        <div className="flex flex-col gap-4 w-full mb-12 relative">
          {banner ? (
            <div
              style={{
                backgroundImage: `url('${banner + '?bust=' + Date.now()}')`,
              }}
              className={`h-72 w-full bg-cover rounded-xl relative`}></div>
          ) : (
            <div
              className={`h-72 w-full bg-[url('https://llakdcvuqyfqiqdrzmld.supabase.co/storage/v1/object/public/banners/placeholder-banner.webp')] bg-cover rounded-xl relative`}></div>
          )}
          {image ? (
            <div className="avatar absolute w-fit ml-4 bottom-[-2rem]">
              <div className="w-20 rounded-full">
                <img src={`${image}?bust=${Date.now()}`} alt="User avatar" />
              </div>
            </div>
          ) : (
            <div className="avatar placeholder absolute w-fit ml-4 bottom-[-2rem]">
              <div className="bg-primary text-neutral-content rounded-full w-20"></div>
            </div>
          )}
        </div>
        {name && (
          <div className="flex gap-4">
            <p className="text-xl font-semibold">{name}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExternalBasicInfoSection;
