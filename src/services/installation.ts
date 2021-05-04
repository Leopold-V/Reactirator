import { writeFileAtTop } from '../utils/writeFileAtTop';
import { promisifyReadFs, promisifyWriteFs } from '../utils/promisifyFs';
import runCmd from '../utils/runCmd';
import { depStateType, formInputType } from '../helpers/types';

export const generateProject = async (filepath: string, input: formInputType, listPackages: depStateType): Promise<void> => {
    const fullPath = `${filepath}\\${input.appname}`

    input.typescript ? await runCmd(`cd ${filepath} && npx create-react-app ${input.appname} --template typescript`)
    : await runCmd(`cd ${filepath} && npx create-react-app ${input.appname}`);

    await installPackages(fullPath, listPackages.dependencies);

    if (input.bootstrap) {
        await installBootstrap(fullPath, input.typescript);
    }
    if (input.reactbootstrap) {
        await installReactBootstrap(fullPath);
    }
    if (input.materialui) {
        await installMaterialUI(fullPath);
    }
    if (input.normalize) {
        await installNormalize(fullPath);
    }
    if (input.tailwind) {
        await installTailwind(fullPath);
    }
    if (input.prettier) {
        await installPrettier(fullPath);
    }
    if (input.flow) {
        await installFlow(fullPath);
    }
    if (input.sourcemapexplorer) {
        await installSourceMapExplorer(fullPath);
    }
    if (input.storybook) {
        await installStorybook(fullPath);
    }
}

const installPackages = async (fullPath: string, listPackages: string[]): Promise<void> => {
    // Todo split dep and dev dep install command
    try {
        const listPromises = listPackages.map(async (ele) => {return await runCmd(`cd ${fullPath} && npm install ${ele}`)});
        await Promise.all(listPromises);       
    } catch (error) {
        throw error;
    }
}

const installMaterialUI = async (fullPath: string): Promise<void> => {
    try {
        await runCmd(`cd ${fullPath} && npm install @material-ui/core`);
    } catch (error) {
        throw error;
    }
}

const installReactBootstrap = async (fullPath: string): Promise<void> => {
    try {
        runCmd(`cd ${fullPath} && npm install react-bootstrap bootstrap`);
    } catch (error) {
        throw error;
    }
}

const installStorybook = async (fullPath: string): Promise<void> => {
    try {
        await runCmd(`cd ${fullPath} && npx -p @storybook/cli sb init`)
    } catch (error) {
        throw error;
    }
}

const installFlow = async (fullPath: string): Promise<void> => {
    try {
        await runCmd(`cd ${fullPath} && npm install flow-bin`);
        const data = await promisifyReadFs(`${fullPath}\\package.json`)
        const packagejson = JSON.parse(data);
        packagejson.scripts["flow"] = "flow";
        await promisifyWriteFs(`${fullPath}\\package.json`, JSON.stringify(packagejson));
        await runCmd(`cd ${fullPath} && npm run flow init`)
    } catch (error) {
        throw error;
    }
}

const installSourceMapExplorer = async (fullPath: string): Promise<void> => {
    try {
        await runCmd(`cd ${fullPath} && npm install source-map-explorer`);
        const data = await promisifyReadFs(`${fullPath}\\package.json`)
        const packagejson = JSON.parse(data);
        packagejson.scripts["analyze"] = "source-map-explorer 'build/static/js/*.js'";
        await promisifyWriteFs(`${fullPath}\\package.json`, JSON.stringify(packagejson));
    } catch (error) {
        throw error;
    }
}

const installBootstrap = async (fullPath: string, withTypescript: boolean): Promise<void> => {
    try {
        await runCmd(`cd ${fullPath} && npm install bootstrap`)
        withTypescript ? await writeFileAtTop(`${fullPath}\\src\\index.tsx`, "import 'bootstrap/dist/css/bootstrap.css';\n")
        : await writeFileAtTop(`${fullPath}\\src\\index.js`, "import 'bootstrap/dist/css/bootstrap.css';\n");
    } catch (error) {
        throw error;
    }
}

const installNormalize = async (fullPath: string): Promise<void> => {
    try {
        await writeFileAtTop(`${fullPath}\\src\\index.css`, '@import-normalize;\n');
    } catch (error) {
        throw error
    }
}

const installPrettier = async (fullPath: string): Promise<void> => {
    try {
        await runCmd(`cd ${fullPath} && npm install --save-dev --save-exact prettier && echo {}> .prettierrc.json`);
        await promisifyWriteFs(`${fullPath}\\src\\.prettierignore`,  `# Ignore artifacts:\nbuild\ncoverage\n`)
    } catch (error) {
        throw error
    }
}

const installTailwind = async (fullPath: string): Promise<void> => {
    try {
        await runCmd(`cd ${fullPath} && npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9 && npm install @craco/craco && npx tailwindcss init`)
        const data = await promisifyReadFs(`${fullPath}\\package.json`)
        const packagejson = JSON.parse(data);
        packagejson.scripts = cracoPackagejson;
        await promisifyWriteFs(`${fullPath}\\craco.config.js`, cracoConfig);
        await promisifyWriteFs(`${fullPath}\\package.json`, JSON.stringify(packagejson));
        await writeFileAtTop(`${fullPath}\\src\\index.css`, tailwindimport);
    } catch (error) {
        throw error
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