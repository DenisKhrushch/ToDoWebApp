import React from 'react';
import styled from 'styled-components';

const NewToDo = styled.input`
  margin: 0;
  width: 100%;
  font-size: 24px;
  line-height: 1.4;
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  transition: color 0.4s;
  border: none;
  color: inherit;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  &:focus {
    outline: 0;
  }
`;

interface InputFieldProps {
  addItem: (value: string) => void;
}

export const InputField = ({ addItem }: InputFieldProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItem((e.target as HTMLInputElement).value);
      (e.target as HTMLInputElement).value = '';
    }
  };

  return (
    <NewToDo placeholder="What needs to be done?" onKeyPress={handleKeyPress} />
  );
};
