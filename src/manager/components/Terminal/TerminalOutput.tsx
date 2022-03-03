import React, { useEffect, useRef } from 'react';
import { XTerm } from 'xterm-for-react';
import { FitAddon } from 'xterm-addon-fit';
import { useProjectData } from '../Contexts/ProjectDataProvider';
import { useLoadingTasks } from '../Contexts/LoadingTasksProvider';
import { runCmdToTerminal } from '../../../utils/runCmd';

export const TerminalOutput = ({ cmd }: { cmd: string }) => {
  const { projectData } = useProjectData();
  const { setLoading } = useLoadingTasks();
  const xtermRef = useRef(null);

  const fitAddon = new FitAddon();

  useEffect(() => {
    console.log(projectData.projectPath);
    xtermRef.current.terminal.setOption('fontSize', 14);
    xtermRef.current.terminal.setOption('convertEol', true);
    xtermRef.current.terminal.setOption('theme', { background: '#2e3748' });
    xtermRef.current.terminal.write(`${projectData.projectPath} > `);
    fitAddon.fit();
  }, []);

  useEffect(() => {
    if (cmd) {
      setLoading(true);
      runCmdToTerminal(cmd, projectData.projectPath, xtermRef.current.terminal).then(() => {
        console.log('false loading');
        setLoading(false);
      });
    }
  }, [cmd]);

  return (
    <XTerm
      className="w-full h-60 bg-blueGray absolute bottom-0 text-sm"
      addons={[fitAddon]}
      ref={xtermRef}
    />
  );
};
