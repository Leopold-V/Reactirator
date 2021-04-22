import React, { ReactNode } from 'react'

const Layout = ({children}: {children: ReactNode}) => {
    return (
        <div className="bg-indigo-600 text-gray-200 min-h-screen p-2">
            {children}
        </div>
    )
}

export default Layout;