export type taskStateType = 'Idle' | 'Pending' | 'Success' | 'Error';

export type actionTaskType = {
  type: 'IDLE' | 'PENDING' | 'FINISH' | 'ERROR' | 'STOP' | 'SWITCH';
  payload?: {
    enabled: boolean;
    taskSate: taskStateType;
    isKill: boolean;
  };
};

export type taskType = {
  enabled: boolean;
  taskState: taskStateType;
  isKill: boolean;
  logs: string;
};

export type projectStateType = {
  projectName: string;
  projectPath: string;
  starter: string;
  scriptDev: string;
  isTypescript: boolean;
  loading?: boolean;
};

export type tasksStateType = {
  tasks: Record<string, taskType>;
};

export type FileStructureType = {
  id: string;
  name: string;
  ancestor: string;
  isFolder: boolean;
  mode?: string;
  path: string;
};

export type projectSrcStateType = {
  projectSrc: FileStructureType[];
};

// TODO:
// Rename to "name" and "version"
export type depSelectType = {
  depName: string;
  depVersion: string;
  isDevDep: boolean;
};

export type depType = {
  name: string;
  version: string;
  status: depStatusType;
  isDevDep: boolean;
};

export type dependenciesStateType = {
  dependencies: Record<string, depType>;
  devDependencies: Record<string, depType>;
  depSelected: depSelectType;
};

export type dependencyFoundType = {
  name: string;
  version: string;
  description: string;
  score: number;
  scoreDetail?: {
    quality: number;
    popularity: number;
    maintenance: number;
  };
  links?: {
    npm: string;
    repository: string;
  };
};

export type depStatusType = 'Idle' | 'Pending';

export type formCompType = {
  functionComponent: boolean;
};
