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
  loading?: boolean;
  tasks: Record<string, taskType>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
};

export type tasksStateType = {
  tasks: Record<string, taskType>;
};
