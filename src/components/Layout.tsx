import React, { ReactNode } from 'react';
import { SideNav } from './SideNav';
import './layout.css';

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div
            id="layout"
            className="relative bg-gray-50 dark:bg-wave-light overflow-y-auto pt-8 flex flex-row h-screen"
        >
            <SideNav />
            <div className="flex flex-grow px-8 py-7">
                { children }
            </div>
        </div>
    )
}