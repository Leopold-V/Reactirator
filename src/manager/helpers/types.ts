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
  taskState: string;
  isKill: boolean;
};

export type projectStateType = {
  projectName: string,
  projectPath: string,
  loading?: boolean,
  tasks: Record<string, taskType>
}

export type tasksStateType = {
  tasks: Record<string, taskType>
}
