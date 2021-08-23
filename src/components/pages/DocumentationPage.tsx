import React from 'react'
import { ReadmeSection } from '../ReadmeBlock'

export const DocumentationPage = ({readme, setReadme}: {readme: string, setReadme: (readme: string) => void}) => {
    return (
        <div>
            Documentation page
            <ReadmeSection readme={readme} setReadme={setReadme} />
        </div>
    )
}
