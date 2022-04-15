import React from 'react';

type scoreNpmPophoverProps = {
  scoreDetail: {
    quality: number;
    popularity: number;
    maintenance: number;
  },
  open: boolean
};

export const ScoreNpmPophover = ({ scoreDetail, open }: scoreNpmPophoverProps) => {
  if (!open) return null;
  return (
    <div className="relative">
      <div className="absolute z-10 w-40 px-4 mt-3 transform -translate-y-1/2 -top-20 -translate-x-1/3 sm:px-0 lg:max-w-3xl">
        <div className="overflow-hidden rounded shadow bg-white">
          <div className="flex flex-col items-center py-2 px-2">
            <span className="text-sm font-medium text-gray-700 pb-2">Score:</span>
            <ul className="space-y-1 text-sm">
              <li>
                <span className="text-sm text-gray-500">Quality:</span>{' '}
                {scoreDetail.quality.toFixed(3)}
              </li>
              <li>
                <span className="text-sm text-gray-500">Popularity:</span>{' '}
                {scoreDetail.popularity.toFixed(3)}
              </li>
              <li>
                <span className="text-sm text-gray-500">Maintenance:</span>{' '}
                {scoreDetail.maintenance.toFixed(3)}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
