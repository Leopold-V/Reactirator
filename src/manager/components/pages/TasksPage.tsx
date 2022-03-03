import React from 'react';
import { useProjectData } from '../Contexts/ProjectDataProvider';
import { useLoadingTasks } from '../Contexts/LoadingTasksProvider';
import { Card } from '../../../common/Card';
import { TasksMainSwitch, TasksSwitch } from '../TasksBlock/TasksSwitch';

export const TasksPage = ({ setCmd }: { setCmd: (cmd: string) => void }) => {
  const { projectData } = useProjectData();
  const { loading } = useLoadingTasks();

  const startScript = Object.entries(projectData.scripts).find(
    (ele) => ele[0] === 'start' || ele[0] === 'dev'
  )[0];

  return (
    <div>
      <h1 className="pb-4 text-lg text-gray-700 font-bold">Tasks:</h1>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <Card large={true}>
            <div className="space-y-4 text-center">
              <h2 className="text-black font-bold text-lg">Development server</h2>
              <TasksMainSwitch task={startScript} setCmd={setCmd} />
            </div>
          </Card>
        </div>
        <ul className="flex flex-col space-y-2 h-64 overflow-y-scroll w-1/2">
          {Object.entries(projectData.scripts)
            .filter((ele) => ele[0] !== 'start' && ele[0] !== 'dev')
            .map((ele, i) => (
              <Card>
                <div className="flex justify-between items-center">
                  <div
                    className="w-1/3 text-left font-bold text-gray-700 hover:opacity-90 transition duration-250"
                    key={i}
                  >
                    {ele[0]}
                  </div>
                  <div className="w-1/3 text-gray-500">{loading ? 'Loading...' : 'Idle'}</div>
                  <TasksSwitch task={ele[0]} setCmd={setCmd} />
                </div>
              </Card>
            ))}
        </ul>
      </div>
    </div>
  );
};
