import React from 'react';
import { Pie } from 'react-chartjs-2';

export const ChartSize = ({
  depsSize,
  devDepsSize,
  totalSize
}: {
  depsSize: number,
  devDepsSize: number
  totalSize: number
}) => {
  const data = {
    labels: ['Base size','Dependencies', 'Dev dependencies'],
    datasets: [
      {
        label: 'Install size',
        data: [totalSize, depsSize, devDepsSize],
        backgroundColor: ['rgba(22, 24, 145, 0.2)', 'rgba(99, 102, 241, .9)', 'rgba(99, 120, 180, 0.4)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(22, 24, 145, 0.2)', 'rgba(99, 102, 241, 0.2)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Pie
        type="pie"
        width={200}
        height={200}
        data={data}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};
