export type taskStateType = 'Idle' | 'Pending' | 'Success' | 'Error';

export type actionTaskType = {
    type: 'IDLE' | 'PENDING' | 'FINISH' | 'ERROR' | 'STOP' | 'SWITCH';
    payload?: {
      enabled: boolean,
      taskSate: taskStateType,
      isKill: boolean
    };
  };