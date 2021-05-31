import React, { useEffect, useState } from 'react'
import { generateTreeMapWithD3 } from '../utils/generateTreeMapWithD3';
import { depStateType } from '../helpers/types';
import listDepsSize from '../utils/listDepsSize';

export const Treemap = ({ listPackages, totalSize }: { listPackages: depStateType, totalSize: number }) => {
    const [depsSize, setDepsSize] = useState(0);
    const [devDepsSize, setDevDepsSize] = useState(0);
  
    useEffect(() => {
      setDepsSize(listDepsSize(listPackages.dependencies));
      setDevDepsSize(listDepsSize(listPackages.devDependencies));
      generateTreeMapWithD3(listPackages);
    }, [listPackages]);

    return (
        <div className="w-8/12 mx-auto">
            <div className="p-6 bg-white text-gray-800 rounded shadow flex justify-center">
                <div id="treemap">
                    <svg id="svg_pie" width="400" height="240" />
                </div> 
            </div>
        </div>
    )
}

export const PackagesSizeMemoized = React.memo(Treemap);