import React, { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div
            id="layout"
            className="relative py-8 bg-gray-100 dark:bg-wave-light overflow-y-auto flex flex-row"
        >
            { children }
        </div>
    )
}