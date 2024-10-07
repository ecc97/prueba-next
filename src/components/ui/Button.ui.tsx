'use client';
import React from 'react';
import styled from 'styled-components';

const BtnStyle = styled.button`
  padding: 1rem;
  background: blue;
  border-radius: 8px;
  color: white;
`

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
    <BtnStyle type={type} onClick={onClick} disabled={disabled}>
      {children}
    </BtnStyle>
  );
};

export default Button;
