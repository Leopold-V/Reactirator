const fs = require('fs');
import writeFileAtTop from '../utils/writeFileAtTop';
import runCmd from '../utils/runCmd';
import { formInputType } from '../helpers/types';


export const generateProject = (filepath: string, input: formInputType): void => {
    /*if (input.typescript) {
        runCmd(`cd ${filepath} && npx create-react-app ${input.appname} --template typescript`);
    }*/
    if (input.normalize) {
        writeFileAtTop(filepath, 'index.css', '@import-normalize;');
    }
    //runCmd(`cd ${filepath} && npx create-react-app ${input.appname}`);
}

//`${filepath}\\${input.appname}\\src\\index.css`, '@import-normalize;'