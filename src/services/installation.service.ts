import { createGithubRepo } from './github.services';
import { writeFileAtTop } from '../utils/writeFileAtTop';
import { promisifyReadFs, promisifyWriteFs } from '../utils/promisifyFs';
import { runCmd } from '../utils/runCmd';
import createTemplateComponent from '../utils/createTemplateComponent';
import { depStateType, formInputType, structureStateType } from '../creator/helpers/types';
import { GithubStateType } from '../creator/components/Contexts/GithubProvider';

export const generateProject = async (
  filepath: string,
  input: formInputType,
  listPackages: depStateType,
  structure: structureStateType,
  scripts: Record<string, unknown>,
  readme: string,
  github: GithubStateType
): Promise<void> => {
  const fullPath = `${filepath}\\${input.appname}`;

  input.typescript
    ? await runCmd(`cd ${filepath} && npx create-react-app ${input.appname} --template typescript`)
    : await runCmd(`cd ${filepath} && npx create-react-app ${input.appname}`);

  await installPackages(fullPath, listPackages);
  await installScripts(fullPath, scripts);

  if (readme) {
    await writeReadme(fullPath, readme);
  }
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
      await runCmd(
        `cd ${fullPath}${structure[i].path.split('\\').slice(0, -1).join('\\')} && mkdir ${
          structure[i].name
        }`
      );
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
  const data = await promisifyReadFs(`${fullPath}\\package.json`);
  const packagejson = JSON.parse(data);
  packagejson.scripts = scripts;
  await promisifyWriteFs(`${fullPath}\\package.json`, JSON.stringify(packagejson));
};

const writeReadme = async (fullPath: string, markdownContent: string): Promise<void> => {
  await promisifyWriteFs(`${fullPath}\\readme.md`, markdownContent);
};

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
  withTypescript
    ? await writeFileAtTop(
        `${fullPath}\\src\\index.tsx`,
        "import 'bootstrap/dist/css/bootstrap.css';\n"
      )
    : await writeFileAtTop(
        `${fullPath}\\src\\index.js`,
        "import 'bootstrap/dist/css/bootstrap.css';\n"
      );
};

const installNormalize = async (fullPath: string): Promise<void> => {
  await writeFileAtTop(`${fullPath}\\src\\index.css`, '@import-normalize;\n');
};

const installPrettier = async (fullPath: string): Promise<void> => {
  await runCmd(
    `cd ${fullPath} && npm install --save-dev --save-exact prettier && echo {}> .prettierrc.json`
  );
  await promisifyWriteFs(
    `${fullPath}\\src\\.prettierignore`,
    `# Ignore artifacts:\nbuild\ncoverage\n`
  );
};

const installTailwind = async (fullPath: string): Promise<void> => {
  await runCmd(
    `cd ${fullPath} && npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init`
  );
  await promisifyWriteFs(`${fullPath}\\tailwind.config.js`, tailwindConfig);
  await writeFileAtTop(`${fullPath}\\src\\index.css`, tailwindimport);
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
