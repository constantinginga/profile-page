import { FC } from 'react';

type ExternalContactSectionProps = {
  email: string;
  phone: string;
};

const ExternalContactSection: FC<ExternalContactSectionProps> = ({
  email,
  phone,
}) => {
  return (
    <section className="flex flex-col gap-4 flex-1">
      <h2 className="font-bold text-lg">Contact information</h2>
      <div className="flex flex-col gap-2">
        <p>
          Email: <span className="font-semibold">{email}</span>
        </p>
        <p>
          Phone: <span className="font-semibold">{phone}</span>
        </p>
      </div>
    </section>
  );
};

export default ExternalContactSection;
