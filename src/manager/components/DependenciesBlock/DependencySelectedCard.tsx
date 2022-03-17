import React, { useEffect, useState } from 'react';
import { searchPackagesV2 } from '../../../services/package.service';
import { useAppSelector } from '../../../hooks';

import { Card } from '../../../common/Card';

export const DependencySelectedCard = () => {
  const [data, setdata] = useState(null);
  const selectedDeps = useAppSelector((state) => state.dependencies.depSelected);

  //TODO:
  //Error handling, UI display.
  const getData = async () => {
    try {
      const pkgData = await searchPackagesV2(selectedDeps.depName);
      setdata(pkgData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedDeps]);

  if (!data)
    return (
      <Card>
        <div className="flex items-center justify-center font-bold text-lg">Loading...</div>
      </Card>
    );
  return (
    <Card>
      <h3>{data.collected.metadata.name}</h3>
      <div>
        Installed version: {selectedDeps.depVersion},
      </div>
      <div>Latest version: {data.collected.metadata.version} 
			({selectedDeps.depVersion === data.collected.metadata.version ? 'Up-to-date' : 'Update'})
			</div>
      <div>{data.collected.metadata.description}</div>
      <div>{data.score.final}</div>
    </Card>
  );
};

/*
    <Card>
      <h3>{data.collected.metadata.name}</h3>
      <div>Latest version: {data.collected.metadata.version}</div>
      <div>{data.collected.metadata.description}</div>
      <div>{data.score.final}</div>
    </Card>
		*/
