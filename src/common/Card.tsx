import React, { ReactNode } from 'react';
import './card.css';

export const Card = ({ children }: { children: ReactNode }) => {
  return <div className="card">{children}</div>;
};
