export type formInputType = {
  appname: string;
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
  };
};

export type actionJsonType =
  | {
      type: 'CHANGE_NAME';
      payload: string;
    }
  | {
      type: 'ADD' | 'REMOVE';
      payload: {
        category: string;
        name: string;
        version?: string;
      };
    }
  | {
      type: string;
      payload: {
        category?: string;
        name?: string;
        version: string;
      };
    };

export type listPackageType = {
  name: string;
  version: string;
}[];

export type depStateType = {
  //[key: string]: string[]
  dependencies: { name: string; size: number }[];
  devDependencies: { name: string; size: number }[];
};
