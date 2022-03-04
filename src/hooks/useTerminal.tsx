import { useEffect } from 'react';
import { runCmdToTerminal } from '../utils/runCmd';
import { useProjectData } from '../manager/components/Contexts/ProjectDataProvider';
import { ipcRenderer } from 'electron';

export const useTerminal = (terminal: any, cmd: string) => {
  const { projectData } = useProjectData();

  useEffect(() => {
    // ipcRenderer.on('child-process', (event, arg) => {
    //   terminal.writeln(arg);
    // })
  }, []);

  return;
};