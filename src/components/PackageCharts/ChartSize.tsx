import React from 'react';
import { Pie } from 'react-chartjs-2';

export const ChartSize = ({
  depsSize,
  devDepsSize,
  baseSize,
}: {
  depsSize: number;
  devDepsSize: number;
  baseSize: number;
}) => {
  const data = {
    labels: ['Base', 'Dependencies', 'Dev dependencies'],
    datasets: [
      {
        label: 'Install size',
        data: [baseSize, depsSize, devDepsSize],
        backgroundColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {
        // @ts-ignore
        <Pie
          width={200}
          height={190}
          data={data}
          options={{ maintainAspectRatio: false, color: 'gray' }}
        />
      }
    </div>
  );
};
