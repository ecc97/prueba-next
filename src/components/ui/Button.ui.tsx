'use client';
import React from 'react';

interface ButtonProps {
  type: 'submit' | 'button' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  disabled,
  children,
}) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
