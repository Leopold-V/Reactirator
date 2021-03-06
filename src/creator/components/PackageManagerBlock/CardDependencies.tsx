import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import { useLoading } from '../Contexts/LoadingPackageProvider';
import { Card } from '../../../common/Card';

export const CardDependencies = ({
  children,
  title,
  listPackages,
}: {
  children: React.ReactNode;
  title: string;
  listPackages: { name: string; size: number }[];
}) => {
  const { loading } = useLoading();

  return (
    <Card>
      <div className="flex flex-col items-center">
        <h2 className="font-medium pb-2">
          {title} ({listPackages.length}) :
        </h2>
        <div className="overflow-y-auto max-h-56 w-full flex justify-center">
          {loading ? <ClipLoader color="#6366F1" loading={loading} size={40} /> : children}
        </div>
      </div>
    </Card>
  );
};
