import React, { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div
            id="layout"
            className="relative bg-gray-100 dark:bg-wave-light overflow-y-auto pt-8 flex flex-row h-screen"
        >
            { children }
        </div>
    )
}