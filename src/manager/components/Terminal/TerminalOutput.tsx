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
      //@ts-ignore
      setSaveLog((saveLog: any) => saveLog + arg.toString());
      setNewLog(arg.toString());
    });
  }, []);

  useEffect(() => {
    xtermRef.current.terminal.writeln();
  }, [newLog])

  return (
    <XTerm
      className={`${inModal ? 'w-96' : 'w-7/12'} bg-blueGray`}
      addons={[fitAddon]}
      ref={xtermRef}
    />
  );
});
