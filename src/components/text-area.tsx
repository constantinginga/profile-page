import { FormEvent, FC } from 'react';

type TextAreaProps = {
  value: string;
  placeholder: string;
  onChange: (event: FormEvent<HTMLTextAreaElement>) => void;
};

const TextArea: FC<TextAreaProps> = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      className="textarea textarea-bordered resize-none h-32"
      required
      placeholder={placeholder}
      value={value}
      onChange={onChange}></textarea>
  );
};

export default TextArea;
