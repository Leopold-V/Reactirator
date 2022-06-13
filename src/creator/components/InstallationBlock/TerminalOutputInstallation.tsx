import React, { useEffect, useRef } from 'react';
import { XTerm } from 'xterm-for-react';
import { FitAddon } from 'xterm-addon-fit';

export const TerminalOutputInstallation = ({ logs }: { logs: string}) => {
  const xtermRef = useRef(null);

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
      className="h-full w-full bg-blueGray p-4"
      addons={[fitAddon]}
      ref={xtermRef}
    />
  );
};
