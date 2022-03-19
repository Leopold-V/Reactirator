import React, { ReactNode } from 'react';
import './card.css';

type cardProps = { children: ReactNode; large?: boolean; width?: string; height?: string };

export const Card = ({ children, large, width, height }: cardProps) => {
  return (
    <div className={`card ${large ? 'lg' : ''}`} style={{ width: width, height: height }}>
      {children}
    </div>
  );
};
