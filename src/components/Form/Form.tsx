'use client';
import { FormStyle } from "./styledForm";

interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <FormStyle onSubmit={onSubmit}>
      {children}
    </FormStyle>
  );
};

export default Form;
