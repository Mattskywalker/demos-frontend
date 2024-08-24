import React, { HTMLAttributes } from 'react';
import './styles.css';

interface Props extends HTMLAttributes<HTMLElement> {}

const Main = ({ children }: Props) => {
  return <main className="main-content">{children}</main>;
};

export default Main;
