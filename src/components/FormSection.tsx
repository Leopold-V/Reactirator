import React, { ReactNode } from 'react'

const FormSection = ({children, title}: {children: ReactNode, title: string}) => {
    return (
        <div className="w-full border-gray-200 border-t-2">
            <h3 className="font-bold text-center py-4">{title} :</h3>
            <div className="flex flex-wrap space-x-6 justify-center">
                {children}
            </div>
        </div>
    )
}

export default FormSection;