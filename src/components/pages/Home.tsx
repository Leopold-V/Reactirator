import React from 'react'

import { Header } from '../Header';
import { Main } from '../Main';
import { Footer } from '../Footer';

export const Home = () => {
    return (
        <div className="flex justify-center flex-col items-center">
            <Header />
            <Main />
            <Footer />
        </div>
    )
}
