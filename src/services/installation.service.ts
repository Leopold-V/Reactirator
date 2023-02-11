import { createGithubRepo } from './github.services';
import { writeFileAtTop } from '../utils/writeFileAtTop';
import { promisifyReadFs, promisifyWriteFs } from '../utils/promisifyFs';
import { runCmd } from '../utils/runCmd';
import createTemplateComponent from '../utils/createTemplateComponent';
import {
  depStateType,
  formInputType,
  starterType,
  structureStateType,
} from '../creator/helpers/types';
import { GithubStateType } from '../creator/components/Contexts/GithubProvider';

export const generateProject = async (
  filepath: string,
  input: formInputType,
  listPackages: depStateType,
  structure: structureStateType,
  scripts: Record<string, unknown>,
  github: GithubStateType,
  starter: starterType
) => {
  if (starter === 'vite') {
    return await generateViteProject(filepath, input, listPackages, structure, scripts, github);
  }
  return await generateCRAProject(filepath, input, listPackages, structure, scripts, github);
};

export const generateViteProject = async (
  filepath: string,
  input: formInputType,
  listPackages: depStateType,
  structure: structureStateType,
  scripts: Record<string, unknown>,
  github: GithubStateType
): Promise<void> => {
  const fullPath =
    process.platform === 'darwin'
      ? `${filepath}/${input.appname}`
      : `${filepath}\\${input.appname}`;

  // TODO: handle npm 6.x versions

  // Ok for npm 7+
  input.typescript
    ? await runCmd(
        `cd ${filepath} && npm create vite@latest ${input.appname} -- --template react-ts`
      )
    : await runCmd(`cd ${filepath} && npm create vite@latest ${input.appname} -- --template react`);

  await installPackages(fullPath, listPackages);
  await installScripts(fullPath, scripts);

  if (input.bootstrap) {
    await installBootstrap(fullPath, input.typescript);
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

  if (github.token && github.reponame) {
    await createGithubRepo(github);
  }
  if (structure.length > 2) {
    await generateStructure(structure, fullPath, input.typescript);
  }
};

export const generateCRAProject = async (
  filepath: string,
  input: formInputType,
  listPackages: depStateType,
  structure: structureStateType,
  scripts: Record<string, unknown>,
  github: GithubStateType
): Promise<void> => {
  const fullPath =
    process.platform === 'darwin'
      ? `${filepath}/${input.appname}`
      : `${filepath}\\${input.appname}`;

  input.typescript
    ? await runCmd(`cd ${filepath} && npx create-react-app ${input.appname} --template typescript`)
    : await runCmd(`cd ${filepath} && npx create-react-app ${input.appname}`);

  await installPackages(fullPath, listPackages);
  await installScripts(fullPath, scripts);

  if (input.bootstrap) {
    await installBootstrap(fullPath, input.typescript);
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
  if (github.token && github.reponame) {
    await createGithubRepo(github);
  }
  if (structure.length > 2) {
    await generateStructure(structure, fullPath, input.typescript);
  }
};

const generateStructure = async (
  structure: structureStateType,
  fullPath: string,
  hasTypescript: boolean
) => {
  for (let i = 2; i < structure.length; i++) {
    if (structure[i].isFolder) {
      const folderPath =
        process.platform === 'darwin'
          ? `${fullPath}${structure[i].path.split('/').slice(0, -1).join('/')}`
          : `${fullPath}${structure[i].path.split('\\').slice(0, -1).join('\\')}`;
      await runCmd(`cd ${folderPath} && mkdir ${structure[i].name}`);
    } else {
      const templateComponent = createTemplateComponent(structure[i].mode, structure[i].name);
      await promisifyWriteFs(
        `${fullPath}${structure[i].path}${hasTypescript ? '.tsx' : '.jsx'}`,
        templateComponent
      );
    }
  }
};

const installPackages = async (fullPath: string, listPackages: depStateType): Promise<void> => {
  for (const packages of listPackages.dependencies) {
    await runCmd(`cd ${fullPath} && npm install ${packages.name}`);
  }
  for (const packages of listPackages.devDependencies) {
    await runCmd(`cd ${fullPath} && npm install -D ${packages.name}`);
  }
};

const installScripts = async (
  fullPath: string,
  scripts: Record<string, unknown>
): Promise<void> => {
  const data =
    process.platform === 'darwin'
      ? await promisifyReadFs(`${fullPath}/package.json`)
      : await promisifyReadFs(`${fullPath}\\package.json`);
  const packagejson = JSON.parse(data);
  packagejson.scripts = scripts;
  const writeFsPath =
    process.platform === 'darwin' ? `${fullPath}/package.json` : `${fullPath}\\package.json`;
  await promisifyWriteFs(writeFsPath, JSON.stringify(packagejson));
};

// const writeReadme = async (fullPath: string, markdownContent: string): Promise<void> => {
//   await promisifyWriteFs(`${fullPath}\\readme.md`, markdownContent);
// };

const installStorybook = async (fullPath: string): Promise<void> => {
  await runCmd(`cd ${fullPath} && npx -p @storybook/cli sb init`);
};

const installFlow = async (fullPath: string): Promise<void> => {
  await runCmd(`cd ${fullPath} && npm install flow-bin`);
  await runCmd(`cd ${fullPath} && npm run flow init`);
};

const installSourceMapExplorer = async (fullPath: string): Promise<void> => {
  await runCmd(`cd ${fullPath} && npm install source-map-explorer`);
};

const installBootstrap = async (fullPath: string, withTypescript: boolean): Promise<void> => {
  await runCmd(`cd ${fullPath} && npm install bootstrap`);
  const mainPath =
    withTypescript && process.platform === 'darwin'
      ? `${fullPath}/src/main.tsx`
      : withTypescript
      ? `${fullPath}\\src\\main.tsx`
      : `${fullPath}\\src\\main.jsx`;

  withTypescript
    ? await writeFileAtTop(mainPath, "import 'bootstrap/dist/css/bootstrap.css';\n")
    : await writeFileAtTop(mainPath, "import 'bootstrap/dist/css/bootstrap.css';\n");
};

const installNormalize = async (fullPath: string): Promise<void> => {
  const writeFileAtTopPath =
    process.platform === 'darwin' ? `${fullPath}/src/index.css` : `${fullPath}\\src\\index.css`;
  await writeFileAtTop(writeFileAtTopPath, '@import-normalize;\n');
};

const installPrettier = async (fullPath: string): Promise<void> => {
  await runCmd(
    `cd ${fullPath} && npm install --save-dev --save-exact prettier && echo {}> .prettierrc.json`
  );
  const prettierignorePath =
    process.platform === 'darwin'
      ? `${fullPath}/src/.prettierignore`
      : `${fullPath}\\src\\.prettierignore`;
  await promisifyWriteFs(prettierignorePath, `# Ignore artifacts:\nbuild\ncoverage\n`);
};

const installTailwind = async (fullPath: string): Promise<void> => {
  await runCmd(
    `cd ${fullPath} && npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init`
  );
  const promisifyWriteFsPath =
    process.platform === 'darwin'
      ? `${fullPath}/tailwind.config.js`
      : `${fullPath}\\tailwind.config.js`;
  await promisifyWriteFs(promisifyWriteFsPath, tailwindConfig);
  const writeFileAtTopPath =
    process.platform === 'darwin' ? `${fullPath}/src/index.css` : `${fullPath}\\src\\index.css`;
  await writeFileAtTop(writeFileAtTopPath, tailwindimport);
};

const tailwindimport = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n`;

const tailwindConfig = `module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
