import React, { useState } from 'react'
import initialPackageJson from '../../helpers/initialPackageJson';

import { Header } from '../Header';
import { Main } from '../Main';
import { ResultLog } from '../ResultLog';

export const Home = () => {
    const [packageJson, setPackageJson] = useState(initialPackageJson);

    return (
        <div className="flex justify-center flex-col items-center">
            <Header />
            <Main packageJson={packageJson} setPackageJson={setPackageJson} />
            <ResultLog packageJson={packageJson} setPackageJson={setPackageJson} />
        </div>
    )
}
