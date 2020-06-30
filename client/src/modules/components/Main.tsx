import React from 'react';
import styled from 'styled-components';
import { ListItem } from './ListItem';
import { InputField } from './InputField';
import { Item } from '../../interfaces/Item';

const SectionWithItems = styled.section`
  border-top: 1px solid #e6e6e6;
  &:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
      0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
`;
const ToDoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
`;

interface MainProps {
  itemsList: Item[];
  addItem: (value: string) => void;
  isChecked: (id: number) => void;
  deleteItem: (id: number) => void;
  addEditedItem: (id: number, value: string) => void;
}

export const Main = ({
  itemsList,
  addItem,
  isChecked,
  deleteItem,
  addEditedItem,
}: MainProps) => {
  return (
    <>
      <InputField addItem={addItem} />
      {itemsList.length ? (
        <SectionWithItems>
          <ToDoList>
            {itemsList.map((item) => (
              <ListItem
                item={item}
                isChecked={isChecked}
                deleteItem={deleteItem}
                addEditedItem={addEditedItem}
                key={item.id}
              />
            ))}
          </ToDoList>
        </SectionWithItems>
      ) : null}
    </>
  );
};
