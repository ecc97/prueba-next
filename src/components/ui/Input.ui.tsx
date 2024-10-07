'use client';
import React from 'react';
import styled from 'styled-components';

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password';
  name: string,
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  disabled
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      />
  );
};

export default Input;
