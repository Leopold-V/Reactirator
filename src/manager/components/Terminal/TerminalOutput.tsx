import React, { useEffect, useRef } from 'react';
import { XTerm } from 'xterm-for-react';
import { FitAddon } from 'xterm-addon-fit';
import { useAppSelector } from '../../../hooks';

type terminalOutputProps = {
  taskName: string;
  inModal?: boolean;
};

export const TerminalOutput = React.memo<terminalOutputProps>(({ taskName, inModal = false }) => {
  const xtermRef = useRef(null);
  const logs = useAppSelector((state) => state.tasks.tasks[taskName].logs);

  const fitAddon = new FitAddon();

  useEffect(() => {
    xtermRef.current.terminal.setOption('fontSize', 14);
    xtermRef.current.terminal.setOption('convertEol', true);
    xtermRef.current.terminal.setOption('theme', { background: '#2e3748' });
    fitAddon.fit();
  }, []);

  useEffect(() => {
    xtermRef.current.terminal.clear();
    xtermRef.current.terminal.writeln(logs);
  }, [logs]);

  return (
    <XTerm
      className={`${inModal ? 'h-48' : 'h-full'} bg-blueGray`}
      addons={[fitAddon]}
      ref={xtermRef}
    />
  );
});
