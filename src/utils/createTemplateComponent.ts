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

    case 'rfce':
      return `import React from 'react';

function ${name}() {
  return <div></div>
};

export default ${name};`;

    case 'rafc':
      return `import React from 'react';

export const ${name} = () => {
  return (
    <div>
      
    </div>
  )
};`;

    case 'rafce':
      return `import React from 'react';

const ${name} = () => {
  return <div></div>
};

export default ${name};`;

    case 'rafcp':
      return `import React from 'react';
import PropTypes from 'prop-types'
      
const ${name} = props => {
  return (
    <div></div>
  )
}

${name}.propTypes = {}

export default ${name}`;

    case 'rmc':
      return `import React, { memo } from 'react';

const ${name} = memo(() => {
  return (
    <div></div>
  )
});

export default ${name};`;

    default:
      console.log('Error unknown component case');
  }
};

export default createTemplateComponent;
