import React, { useEffect, useRef, useState } from 'react';
import { XTerm } from 'xterm-for-react';
import { FitAddon } from 'xterm-addon-fit';
import { ipcRenderer } from 'electron';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { updateLogs } from '../../../slices/projectSlice';

type terminalOutputProps = {
  taskName: string;
  log: string;
  inModal?: boolean;
  setSaveLog?: (saveLog: string) => void;
};

export const TerminalOutput = React.memo<terminalOutputProps>(
  ({ taskName, log, inModal = false, setSaveLog }) => {
    const xtermRef = useRef(null);
    const [newLog, setNewLog] = useState('');
    const logs = useAppSelector(state => state.project.tasks[taskName].logs);
    const dispatch = useAppDispatch();
    
    const fitAddon = new FitAddon();

    useEffect(() => {
      xtermRef.current.terminal.setOption('fontSize', 14);
      xtermRef.current.terminal.setOption('convertEol', true);
      xtermRef.current.terminal.setOption('theme', { background: '#2e3748' });
      fitAddon.fit();
      //xtermRef.current.terminal.writeln(logs);
      ipcRenderer.on(`child-process-${taskName}`, (event, arg) => {
        if (!inModal) {
          //@ts-ignore
          dispatch(updateLogs({ taskName: taskName, logs: arg.toString()}));
        }
      });
      // TODO: clean up ipcRenderer listeners, it might interfer with the task switch listener,
      // so maybe have a different event name between the task item component and this component.
    }, []);

    useEffect(() => {
      xtermRef.current.terminal.clear();
      xtermRef.current.terminal.writeln(logs);
      console.log(logs);
    }, [logs]);

    /*
    useEffect(() => {
      xtermRef.current.terminal.writeln(newLog);
    }, [newLog]);*/

    /*
    useEffect(() => {
      console.log('log change should write task aborted');
      if (!inModal) {
        xtermRef.current.terminal.writeln(log);
      }
    }, [log]);*/

    return (
      <XTerm
        className={`${inModal ? 'w-96' : 'w-7/12'} bg-blueGray`}
        addons={[fitAddon]}
        ref={xtermRef}
      />
    );
  }
);
