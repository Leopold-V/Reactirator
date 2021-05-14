import React, { useEffect } from 'react'
import { Chart, Pie } from 'react-chartjs-2';

export const ChartSize = ({totalSize, newDepsSize}: {totalSize: number, newDepsSize: number}) => {

    const data = {
        labels: ['Base size', 'New deps total size'],
        datasets: [
          {
            label: '# of Votes',
            data: [totalSize-newDepsSize, newDepsSize],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(99, 102, 241, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
    };

    return (
        <div>
            <Pie type="pie" width={200} height={200} data={data} options={{ maintainAspectRatio: false }} />
        </div>
    );
}