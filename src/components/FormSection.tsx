import React, { ReactNode } from 'react'

const FormSection = ({children, title, color}: {children: ReactNode, title: string, color: string}) => {
    return (
        <div className={`w-full bg-${color}-50 text-${color}-600 py-4 rounded`}>
            <h3 className="font-bold text-center text-sm pb-4 ">{title}</h3>
            <div className="flex flex-wrap space-x-6 justify-center">
                {children}
            </div>
        </div>
    )
}

export default FormSection;