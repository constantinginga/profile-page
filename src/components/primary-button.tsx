import { FC } from 'react';

type PrimaryButtonProps = {
  type: 'submit' | 'button';
  loading: boolean;
  children: string;
  onClick?: () => void;
};

const PrimaryButton: FC<PrimaryButtonProps> = ({
  loading,
  children,
  type,
  onClick,
}) => {
  return (
    <button
      type={type}
      className="btn btn-primary w-fit"
      disabled={loading}
      onClick={onClick}>
      {loading ? (
        <>
          <span className="loading loading-spinner"></span>
          {children}
        </>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
};

export default PrimaryButton;
