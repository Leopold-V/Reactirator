import writeFileAtTop from '../utils/writeFileAtTop';
import runCmd from '../utils/runCmd';
import { formInputType } from '../helpers/types';
const fs = require('fs');

export const generateProject = (filepath: string, input: formInputType): void => {
    runCmd(`cd ${filepath} && npx create-react-app ${input.appname}`, () => {
        /*if (input.bootstrap) {
            installBootstrap(filepath, input);
        }
        if (input.normalize) {
            installNormalize(filepath, input);
        }*/
        if (input.tailwind) {
            installTailwind(filepath, input);
        }
    });
    /*if (input.typescript) {
        runCmd(`cd ${filepath} && npx create-react-app ${input.appname} --template typescript`);
    }*/
}

const installBootstrap = (filepath: string, input: formInputType): void => {
    runCmd(`cd ${filepath}\\${input.appname} && npm install bootstrap`, () => {
        writeFileAtTop(`${filepath}\\${input.appname}\\src`, 'index.js', "import 'bootstrap/dist/css/bootstrap.css';\n");
    });
}

const installNormalize = (filepath: string, input: formInputType): void => {
    writeFileAtTop(`${filepath}\\${input.appname}\\src`, 'index.css', '@import-normalize;\n');
}

const installPrettier = (filepath: string, input: formInputType): void => {
    runCmd(`cd ${filepath}\\${input.appname} && npm install --save-dev --save-exact prettier && echo {}> .prettierrc.json
    && mkdir .prettierignore`, () => {
        fs.writeFile(`${filepath}\\${input.appname}\\src\\.prettierignore`,  `# Ignore artifacts:\nbuild\ncoverage\n`)
    });
}

const installTailwind = (filepath: string, input: formInputType): void => {
    runCmd(`cd ${filepath}\\${input.appname} && npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9 && npm install @craco/craco && npx tailwindcss init`,
    () => {
        fs.readFile(`${filepath}\\${input.appname}\\package.json`, 'utf8', (err: Error, data: any) => {
            if (err) {
                throw err;
            }
            const packagejson = JSON.parse(data);
            packagejson.scripts = {
                start : "craco start",
                build: "craco build",
                test: "craco test",
                eject: "react-scripts eject"
            };
            fs.writeFile(`${filepath}\\${input.appname}\\craco.config.js`, cracoData, (err: Error) => {
                if (err) throw err;
            });
            fs.writeFile(`${filepath}\\${input.appname}\\package.json`, JSON.stringify(packagejson), (err: Error) => {
                if (err) throw err;
            });
            writeFileAtTop(`${filepath}\\${input.appname}\\src`, 'index.css', tailwindimport);
        });
    });
}

const cracoData = `module.exports = {
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
}`;

const tailwindimport = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`;