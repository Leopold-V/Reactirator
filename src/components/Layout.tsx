import React, { ReactNode } from 'react'

const Layout = ({children}: {children: ReactNode}) => {
    return (
        <div className="bg-blue-900 text-gray-200 min-h-screen p-2">
            {children}
        </div>
    )
}

export default Layout;