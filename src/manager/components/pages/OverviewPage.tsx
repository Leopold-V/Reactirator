import React from 'react';
import { Link } from 'react-router-dom';

export const OverviewPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-6">
      <Link className="flex items-center justify-around font-extrabold text-2xl" to="/">
        <img src="../assets/icons/png/32x32.png" alt="icon" />
        <span>Reactirator</span>
      </Link>
      <div className="font-extrabold text-4xl">Overview</div>
    </div>
  );
};
