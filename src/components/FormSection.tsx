import React, { ReactNode } from 'react'

const FormSection = ({children, title}: {children: ReactNode, title: string}) => {
    return (
        <div className="w-full">
            <h3 className="font-bold text-center py-4">{title} :</h3>
            <div className="flex flex-wrap space-x-6 justify-center">
                {children}
            </div>
        </div>
    )
}

export default FormSection;