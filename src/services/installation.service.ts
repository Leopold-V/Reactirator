import { createGithubRepo } from './github.services';
import { writeFileAtTop } from '../utils/writeFileAtTop';
import { promisifyReadFs, promisifyWriteFs } from '../utils/promisifyFs';
import runCmd from '../utils/runCmd';
import { depStateType, formInputType, structureStateType } from '../helpers/types';
import { GithubStateType } from '../components/Contexts/GithubProvider';

export const generateProject = async (
  filepath: string,
  input: formInputType,
  listPackages: depStateType,
  structure: structureStateType,
  scripts: {},
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
    await generateStructure(structure, fullPath);
  }
};

const generateStructure = async (structure: structureStateType, fullPath: string) => {
  /*for (let i = 2; i < structure.length; i ++) {
    if (structure[i].isFolder) {
      runCmd(`cd ${fullPath}\\src && mkdir ${structure[i].name}`)
    }
  }*/
}

const installPackages = async (fullPath: string, listPackages: depStateType): Promise<void> => {
  try {
    for (let packages of listPackages.dependencies) {
      await runCmd(`cd ${fullPath} && npm install ${packages.name}`);
    }
    for (let packages of listPackages.devDependencies) {
      await runCmd(`cd ${fullPath} && npm install -D ${packages.name}`);
    }
  } catch (error) {
    throw error;
  }
};

const installScripts = async (fullPath: string, scripts: {}): Promise<void> => {
  try {
    const data = await promisifyReadFs(`${fullPath}\\package.json`);
    const packagejson = JSON.parse(data);
    packagejson.scripts = scripts;
    await promisifyWriteFs(`${fullPath}\\package.json`, JSON.stringify(packagejson));
  } catch (error) {
    throw error;
  }
};

const writeReadme = async (fullPath: string, markdownContent: string): Promise<void> => {
  try {
    await promisifyWriteFs(`${fullPath}\\readme.md`, markdownContent);
  } catch (error) {
    throw error;
  }
};

const installStorybook = async (fullPath: string): Promise<void> => {
  try {
    await runCmd(`cd ${fullPath} && npx -p @storybook/cli sb init`);
  } catch (error) {
    throw error;
  }
};

const installFlow = async (fullPath: string): Promise<void> => {
  try {
    await runCmd(`cd ${fullPath} && npm install flow-bin`);
    await runCmd(`cd ${fullPath} && npm run flow init`);
  } catch (error) {
    throw error;
  }
};

const installSourceMapExplorer = async (fullPath: string): Promise<void> => {
  try {
    await runCmd(`cd ${fullPath} && npm install source-map-explorer`);
  } catch (error) {
    throw error;
  }
};

const installBootstrap = async (fullPath: string, withTypescript: boolean): Promise<void> => {
  try {
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
  } catch (error) {
    throw error;
  }
};

const installNormalize = async (fullPath: string): Promise<void> => {
  try {
    await writeFileAtTop(`${fullPath}\\src\\index.css`, '@import-normalize;\n');
  } catch (error) {
    throw error;
  }
};

const installPrettier = async (fullPath: string): Promise<void> => {
  try {
    await runCmd(
      `cd ${fullPath} && npm install --save-dev --save-exact prettier && echo {}> .prettierrc.json`
    );
    await promisifyWriteFs(
      `${fullPath}\\src\\.prettierignore`,
      `# Ignore artifacts:\nbuild\ncoverage\n`
    );
  } catch (error) {
    throw error;
  }
};

const installTailwind = async (fullPath: string): Promise<void> => {
  try {
    await runCmd(
      `cd ${fullPath} && npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9 && npm install @craco/craco && npx tailwindcss init`
    );
    await promisifyWriteFs(`${fullPath}\\craco.config.js`, cracoConfig);
    await writeFileAtTop(`${fullPath}\\src\\index.css`, tailwindimport);
  } catch (error) {
    throw error;
  }
};

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
