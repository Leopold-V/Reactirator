import React from 'react'
import { ReadmeSection } from '../ReadmeBlock'

export const DocumentationPage = ({readme, setReadme}: {readme: string, setReadme: (readme: string) => void}) => {
    return (
        <div className="flex justify-center w-full">
            <ReadmeSection readme={readme} setReadme={setReadme} />
        </div>
    )
}
