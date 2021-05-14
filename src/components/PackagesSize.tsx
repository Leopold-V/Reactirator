import React from 'react'
import { depStateType } from '../helpers/types'

export const PackagesSize = ({listPackages}: {listPackages: depStateType}) => {
    return (
        <div>
            <h2>{Object.values(listPackages.dependencies).reduce((a, b) => a + b.size, 0)}</h2>
        </div>
    )
}
