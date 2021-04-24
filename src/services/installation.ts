const fs = require('fs');
import { writeFileAtTop } from '../utils/writeFileAtTop';
import { promisifyReadFs, promisifyWriteFs } from '../utils/promisifyFs';
import runCmd from '../utils/runCmd';
import { formInputType } from '../helpers/types';

export const generateProject = async (filepath: string, input: formInputType) => {
    const fullPath: string = `${filepath}\\${input.appname}`

    input.typescript ? await runCmd(`cd ${filepath} && npx create-react-app ${input.appname} --template typescript`)
    : await runCmd(`cd ${filepath} && npx create-react-app ${input.appname}`);

    if (input.bootstrap) {
        try {
            await installBootstrap(fullPath, input.typescript);
        } catch (error) {
            throw error;
        }
    }
    if (input.normalize) {
        await installNormalize(fullPath);
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
    if (input.proptypes) {
        await installPropTypes(fullPath);
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

const installPropTypes = async (fullPath: string) => {
    try {
        await runCmd(`cd ${fullPath} && npm install prop-types`);
    } catch (error) {
        console.log(error);
    }
}

const installBootstrap = async (fullPath: string, withTypescript: boolean) => {
    try {
        await runCmd(`cd ${fullPath} && npm install bootstrap`)
        withTypescript ? await writeFileAtTop(`${fullPath}\\src\\index.ts`, "import 'bootstrap/dist/css/bootstrap.css';\n")
        : await writeFileAtTop(`${fullPath}\\src\\index.js`, "import 'bootstrap/dist/css/bootstrap.css';\n");
    } catch (error) {
        throw error;
    }
}

const installNormalize = async (fullPath: string) => {
    try {
        await writeFileAtTop(`${fullPath}\\src\\index.css`, '@import-normalize;\n');
    } catch (error) {
        console.log(error);
    }
}

const installPrettier = async (fullPath: string) => {
    try {
        await runCmd(`cd ${fullPath} && npm install --save-dev --save-exact prettier && echo {}> .prettierrc.json`);
        await promisifyWriteFs(`${fullPath}\\src\\.prettierignore`,  `# Ignore artifacts:\nbuild\ncoverage\n`)
    } catch (error) {
        console.log(error);
    }
}

const installTailwind = async (fullPath: string) => {
    try {
        await runCmd(`cd ${fullPath} && npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9 && npm install @craco/craco && npx tailwindcss init`)
        const data = await promisifyReadFs(`${fullPath}\\package.json`)
        const packagejson = JSON.parse(data);
        packagejson.scripts = cracoPackagejson;
        await promisifyWriteFs(`${fullPath}\\craco.config.js`, cracoConfig);
        await promisifyWriteFs(`${fullPath}\\package.json`, JSON.stringify(packagejson));
        await writeFileAtTop(`${fullPath}\\src\\index.css`, tailwindimport);
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