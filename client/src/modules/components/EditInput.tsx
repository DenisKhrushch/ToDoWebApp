import React, { useState } from 'react';
import styled from 'styled-components';
import { Item } from '../../interfaces/Item';

const EditInputField = styled.input`
  position: absolute;
  background-color: #fff;
  left: 0;
  top: 0;
  border: 1px solid #3f51b5;
  width: 492px;
  margin-left: 60px;
  padding: 22px 16px 22px 10px;
  font-size: 24px;
  color: rgb(77, 77, 77);
  &:focus {
    outline: 0;
  }
  z-index: 3;
`;

interface EditInputProps {
  item: Item;
  addEditedItem: (id: number, value: string) => void;
  setFlag: () => void;
}

export const EditInput = ({ item, addEditedItem, setFlag }: EditInputProps) => {
  const [value, setValue] = useState<string>(item.value);
  const handleOnBlur = () => {
    setFlag();
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addEditedItem(item.id, value);
      setFlag();
    }
  };

  return (
    <EditInputField
      value={value}
      onKeyPress={handleKeyPress}
      onBlur={handleOnBlur}
      onChange={handleOnChange}
    />
  );
};
