import React from 'react';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Item } from '../../interfaces/Item';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

interface CheckProps {
  item: Item;
  isChecked: (id: number) => void;
}

export const Check = ({ item, isChecked }: CheckProps) => {
  const handleChange = () => {
    isChecked(item.id);
  };
  return <GreenCheckbox checked={!item.active} onChange={handleChange} />;
};
