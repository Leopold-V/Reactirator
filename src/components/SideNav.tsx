import React from 'react'
import { Link } from 'react-router-dom'

export const SideNav = () => {
    return (
        <div className="w-72 h-screen bg-primary">
            <ul className="text-white">
                <li><Link to='/'>Overview</Link></li>
                <li><Link to='/packages'>Packages</Link></li>
            </ul>
        </div>
    )
}
