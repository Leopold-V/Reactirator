import React, { useEffect, useRef, useState } from 'react';
import { XTerm } from 'xterm-for-react';
import { FitAddon } from 'xterm-addon-fit';
import { ipcRenderer } from 'electron';

export const TerminalOutput = React.memo<{ task: string, log: string, inModal?: boolean, setSaveLog?: (saveLog: string) => void }>(({
    task,
    log,
    inModal = false,
    setSaveLog = ''
}) => {
  const [newLog, setNewLog] = useState('');
  const xtermRef = useRef(null);

  const fitAddon = new FitAddon();
  
  useEffect(() => {
    xtermRef.current.terminal.setOption('fontSize', 14);
    xtermRef.current.terminal.setOption('convertEol', true);
    xtermRef.current.terminal.setOption('theme', { background: '#2e3748' });
    fitAddon.fit();
    xtermRef.current.terminal.writeln(log);
    ipcRenderer.on(`child-process-${task}`, (event, arg) => {
      if (inModal) {
      //@ts-ignore
      setSaveLog((saveLog: string) => saveLog + arg.toString());
      }
      setNewLog(arg.toString());
    });
    // TODO: clean up ipcRenderer listeners, it might interfer with the task switch listener, 
    // so maybe have a different event name between the task item component and this component.
  }, []);

  useEffect(() => {
    xtermRef.current.terminal.writeln(newLog);
  }, [newLog])

  return (
    <XTerm
      className={`${inModal ? 'w-96' : 'w-7/12'} bg-blueGray`}
      addons={[fitAddon]}
      ref={xtermRef}
    />
  );
});
