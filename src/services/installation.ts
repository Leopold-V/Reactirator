import writeFileAtTop from '../utils/writeFileAtTop';
import runCmd from '../utils/runCmd';
import { formInputType } from '../helpers/types';
const fs = require('fs');

export const generateProject = async (filepath: string, input: formInputType) => {
    const fullPath: string = `${filepath}\\${input.appname}`
    /*if (input.typescript) {
        runCmd(`cd ${filepath} && npx create-react-app ${input.appname} --template typescript`);
    }*/
    await runCmd(`cd ${filepath} && npx create-react-app ${input.appname}`);
    if (input.bootstrap) {
        await installBootstrap(fullPath);
    }
    if (input.normalize) {
        installNormalize(fullPath);
    }
    if (input.tailwind) {
        await installTailwind(fullPath);
    }
    if (input.styledcomponents) {
        await installStyledComponents(fullPath);
    }
    if (input.reactrouter) {
        await installReactRouter(fullPath);
    }
    if (input.prettier) {
        await installPrettier(fullPath);
    }
}

const installReactRouter = async (fullPath: string) => {
    try {
        await runCmd(`cd ${fullPath} && npm install react-router-dom`);
    } catch (error) {
        console.log(error);
    }
}

const installStyledComponents = async (fullPath: string) => {
    try {
        await runCmd(`cd ${fullPath} && npm install styled-components`);
    } catch (error) {
        console.log(error);
    }
}

const installBootstrap = async (fullPath: string) => {
    try {
        await runCmd(`cd ${fullPath} && npm install bootstrap`)
        writeFileAtTop(`${fullPath}\\src`, 'index.js', "import 'bootstrap/dist/css/bootstrap.css';\n");
    } catch (error) {
        console.log(error);
    }
}

const installNormalize = (fullPath: string) => {
    writeFileAtTop(`${fullPath}\\src`, 'index.css', '@import-normalize;\n');
}

const installPrettier = async (fullPath: string) => {
    try {
        await runCmd(`cd ${fullPath} && npm install --save-dev --save-exact prettier && echo {}> .prettierrc.json`);
        fs.writeFile(`${fullPath}\\src\\.prettierignore`,  `# Ignore artifacts:\nbuild\ncoverage\n`, (err: Error) => {
            if (err) throw err;
        });
    } catch (error) {
        console.log(error);
    }
}

const installTailwind = async (fullPath: string) => {
    try {
        await runCmd(`cd ${fullPath} && npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9 && npm install @craco/craco && npx tailwindcss init`)
        fs.readFile(`${fullPath}\\package.json`, 'utf8', (err: Error, data: any) => {
            if (err) {
                throw err;
            }
            const packagejson = JSON.parse(data);
            packagejson.scripts = cracoPackagejson;
            fs.writeFile(`${fullPath}\\craco.config.js`, cracoConfig, (err: Error) => {
                if (err) throw err;
            });
            fs.writeFile(`${fullPath}\\package.json`, JSON.stringify(packagejson), (err: Error) => {
                if (err) throw err;
            });
            writeFileAtTop(`${fullPath}\\src`, 'index.css', tailwindimport);
        });
    } catch (error) {
        console.log(error);
    }
}

const cracoPackagejson = {
    start : "craco start",
    build: "craco build",
    test: "craco test",
    eject: "react-scripts eject"
}

const cracoConfig = `module.exports = {
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