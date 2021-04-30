import React, { ReactNode } from 'react'
import { Navbar } from './Navbar';

const Layout = ({children}: {children: ReactNode}) => {
    return (
        <div className="">
            <Navbar />
            <div id="layout" className="py-10 bg-indigo-600 text-gray-200 h-screen overflow-y-auto">
                {children}
            </div>
        </div>
    )
}

export default Layout;