import React, { useEffect } from 'react'
import { generateTreeMapWithD3 } from '../utils/generateTreeMapWithD3';
import { depStateType } from '../helpers/types';

export const Treemap = ({ listPackages }: { listPackages: depStateType }) => {
  
    useEffect(() => {
      generateTreeMapWithD3(listPackages);
    }, [listPackages]);

    return (
        <div className="w-8/12 mx-auto">
            <div className="p-6 bg-white text-gray-800 rounded shadow flex justify-center">
                <h2>Treemap</h2>
                <div id="treemap"></div> 
            </div>
        </div>
    )
}

export const TreemapMemoized = React.memo(Treemap);