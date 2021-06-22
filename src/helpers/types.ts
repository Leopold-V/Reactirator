export type formInputType = {
  appname: string;
  description: string;
  typescript: boolean;
  prettier: boolean;
  flow: boolean;
  tailwind: boolean;
  bootstrap: boolean;
  reactbootstrap: boolean;
  materialui: boolean;
  styledcomponents: boolean;
  normalize: boolean;
  reactrouter: boolean;
  proptypes: boolean;
  sourcemapexplorer: boolean;
  storybook: boolean;
};

export type actionPackageType = {
  type: 'CHANGE_TYPE' | 'ADD' | 'REMOVE';
  payload: {
    destination: 'dependencies' | 'devDependencies';
    source?: string;
    name: string;
    size?: number;
    version?: string;
    dependencies?: string[];
  };
};

export type actionJsonType =
  | {
      type: 'CHANGE_INFO';
      payload: {
        name: string;
        description: string;
      };
    }
  | {
      type: 'CHANGE_SCRIPTS';
      payload: {
        scripts: string;
      };
    }
  | {
      type: 'ADD' | 'REMOVE';
      payload: {
        category: string;
        name: string;
        version?: string;
        description?: string;
        scripts?: string;
      };
    }
  | {
      type: string;
      payload: {
        category?: string;
        name?: string;
        version: string;
        description?: string;
        scripts?: string;
      };
    };

export type listPackageType = packageFoundType[];

export type packageFoundType = {
  name: string;
  version: string;
  description: string;
  score: number;
};

export type depStateType = {
  //[key: string]: string[]
  dependencies: { name: string; size: number; version: string; dependencies: string[] }[];
  devDependencies: { name: string; size: number; version: string; dependencies: string[] }[];
};
