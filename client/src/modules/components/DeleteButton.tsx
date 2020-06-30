import React from 'react';
import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';
import { Item } from '../../interfaces/Item';

const useStyles = makeStyles(() => ({
  clear: {
    color: 'rgb(220, 0, 78)',
  },
}));
const RemoveFromList = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s ease-out;
`;

interface DeleteButtonProps {
  item: Item;
  deleteItem: (id: number) => void;
}

export const DeleteButton = ({ item, deleteItem }: DeleteButtonProps) => {
  const classes = useStyles();
  const handleClick = () => {
    deleteItem(item.id);
  };
  return (
    <RemoveFromList className="remove-from-list" onClick={handleClick}>
      <ClearIcon className={classes.clear} />
    </RemoveFromList>
  );
};
