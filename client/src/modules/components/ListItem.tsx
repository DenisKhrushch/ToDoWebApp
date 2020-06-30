import React, { useState } from 'react';
import styled from 'styled-components';
import { Check } from './Checkbox';
import { Label } from './Label';
import { DeleteButton } from './DeleteButton';
import { EditInput } from './EditInput';
import { Item } from '../../interfaces/Item';

const ToDoItem = styled.li`
  background-position: center left;
  background-position-x: 10px;
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
  padding: 16px 16px 16px 10px !important;
  transition: background-image 0.3s;
  transition-timing-function: ease;
  &:last-child {
    border-bottom: none;
  }
  &:hover .remove-from-list {
    visibility: visible;
    opacity: 1;
  }
`;

interface ListItemProps {
  item: Item;
  isChecked: (id: number) => void;
  deleteItem: (id: number) => void;
  addEditedItem: (id: number, value: string) => void;
}

export const ListItem = ({
  item,
  isChecked,
  deleteItem,
  addEditedItem,
}: ListItemProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const DoubleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <ToDoItem>
      <div className="view">
        <Check item={item} isChecked={isChecked} />
        <Label item={item} DoubleClick={DoubleClick} />
        <DeleteButton item={item} deleteItem={deleteItem} />
      </div>
      {isVisible ? (
        <EditInput
          item={item}
          addEditedItem={addEditedItem}
          setFlag={DoubleClick}
        />
      ) : null}
    </ToDoItem>
  );
};
