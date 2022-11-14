// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { XTerm } from 'xterm-for-react';
import { FitAddon } from 'xterm-addon-fit';
import { Hook, Unhook } from 'console-feed';

export const TerminalOutputInstallation = () => {
  const xtermRef = useRef(null);

  const fitAddon = new FitAddon();
  const [logs, setLogs] = useState('');

  useEffect(() => {
    Hook(
      window.console,
      (log) => {
        setLogs(log.data[0] + '\n'); // if (logs) => logs + log.data[0] then all logs are displayed with each new log.
      },
      false
    );
    return () => Unhook(window.console);
  }, []);

  useEffect(() => {
    xtermRef.current.terminal.setOption('fontSize', 14);
    xtermRef.current.terminal.setOption('convertEol', true);
    xtermRef.current.terminal.setOption('theme', { background: '#2e3748' });
    fitAddon.fit();
  }, []);

  useEffect(() => {
    xtermRef.current.terminal.writeln(logs);
  }, [logs]);

  return <XTerm className="h-full w-full bg-blueGray p-4" addons={[fitAddon]} ref={xtermRef} />;
};
