const createTemplateComponent = (mode: string, name: string) => {
    switch (mode) {
        case 'rfc':
            return `import React from 'react';

export default function ${name}() {
    return (
        <div>
            
        </div>
    )
};`;
        case 'rcc':
            return `import React, { Component } from 'react';

export default class ${name} extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
};`;
    }
};

export default createTemplateComponent;
