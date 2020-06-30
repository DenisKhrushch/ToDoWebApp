import React from 'react';
import styled, { css } from 'styled-components';
import { Item } from '../../interfaces/Item';

interface StyledLabelProps {
  completed: boolean;
}

const StyledLabel = styled.label<StyledLabelProps>`
  padding: 16px 16px 16px 15px;
  font-size: 24px;
  min-width: 475px;
  transition: color 0.4s;
  line-height: 1.2;
  transition-timing-function: ease;
  transition-delay: 0s;
  color: rgb(77, 77, 77);
  text-decoration: none;
  &:hover .remove-from-list {
    visibility: visible;
    opacity: 1;
  }
  ${({ completed }: StyledLabelProps) =>
    completed &&
    css`
      color: #d9d9d9;
      text-decoration: line-through;
    `};
`;

interface LabelProps {
  item: Item;
  DoubleClick: () => void;
}

export const Label = ({ item, DoubleClick }: LabelProps) => {
  return (
    <StyledLabel completed={!item.active} onDoubleClick={DoubleClick}>
      {item.value}
    </StyledLabel>
  );
};
