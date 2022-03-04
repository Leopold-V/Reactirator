import child_process, { spawn, execFile } from 'child_process';

export const runCmd = (cmd: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const installProcess = child_process.exec(cmd, (error: Error, data: string) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
    installProcess.stdout.on('data', (data: string) => {
      console.log(data);
    });
    installProcess.stderr.on('data', (data: string) => {
      console.log(data);
    });
    installProcess.on('error', (error: Error) => {
      console.error(`error: ${error.message}`);
    });
  });
};

export const runCmdToTerminal = (cmd: string, path: string, terminal: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    const installProcess = spawn(
      /^win/.test(process.platform) ? 'npm.cmd' : 'npm',
      ['run', cmd],
      {
        cwd: path,
        shell: false,
      });
    installProcess.stdout.on('data', (data: string) => {
      terminal.writeln(data);
    });
    installProcess.stderr.on('data', (data: string) => {
      terminal.writeln(data);
    });
    installProcess.on('error', (error: Error) => {
      terminal.writeln(error.message);
    });
    installProcess.on('close', () => {
      resolve();
    });
  });
};
