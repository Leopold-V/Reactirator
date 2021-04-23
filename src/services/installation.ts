const fs = require('fs');
import writeFileAtTop from '../utils/writeFileAtTop';
import runCmd from '../utils/runCmd';
import { formInputType } from '../helpers/types';

export const generateProject = (filepath: string, input: formInputType): void => {
    runCmd(`cd ${filepath} && npx create-react-app ${input.appname}`, () => {
        if (input.bootstrap) {
            installBootstrap(filepath, input);
        }
    });
    /*if (input.typescript) {
        runCmd(`cd ${filepath} && npx create-react-app ${input.appname} --template typescript`);
    }*/

    /*if (input.normalize) {
        writeFileAtTop(`${filepath}\\${input.appname}`, 'src\\index.css', '@import-normalize;');
    }*/
}

const installBootstrap = (filepath: string, input: formInputType): void => {
    runCmd(`cd ${filepath}\\${input.appname} && npm install bootstrap`);
    writeFileAtTop(`${filepath}\\${input.appname}\\src`, 'index.js', "import 'bootstrap/dist/css/bootstrap.css';\n");
}

//`${filepath}\\${input.appname}\\src\\index.css`, '@import-normalize;'