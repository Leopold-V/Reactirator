import React, { ReactNode } from 'react';
import './card.css';

export const Card = ({ children, large }: { children: ReactNode; large?: boolean }) => {
  return <div className={`card ${large ? 'lg' : ''}`}>{children}</div>;
};
