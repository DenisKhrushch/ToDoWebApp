import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
  text-align: center;
  color: #3f51b5;
  font-size: 100px;
  margin: 0;
`;

export const Header = () => {
  return (
    <header>
      <Heading>todos</Heading>
    </header>
  );
};
