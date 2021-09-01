const createTemplateComponent = (mode: string, name: string) => {
  if (mode === 'rfc') {
    return `
        import React from 'react'
    
    export default function ${name}() {
        return (
            <div>
                
            </div>
        )
    }`;
  }
  if (mode === 'rcc') {
    return `import React, { Component } from 'react'
        export default class ${name} extends Component {
            render() {
                return (
                    <div>
                        
                    </div>
                )
            }
        }`;
  }
};

export default createTemplateComponent;
