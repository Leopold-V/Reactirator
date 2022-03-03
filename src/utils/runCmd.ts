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

export const runCmdToTerminal = (cmd: string, path: string, terminal: any) => {
  return new Promise((resolve, reject) => {
    const installProcess = execFile(
      /^win/.test(process.platform) ? 'npm.cmd' : 'npm',
      ['run', cmd],
      {
        cwd: path,
        shell: false,
      },
      (error: Error, data: string) => {
        if (error) {
          reject(error);
        }
        console.log('hello resolve');
        resolve(data);
      }
    );
    installProcess.stdout.on('data', (data: string) => {
      console.log(process.pid);
      terminal.writeln(data);
    });
    installProcess.stderr.on('data', (data: string) => {
      console.log(process.pid);

      terminal.writeln(data);
    });
    installProcess.on('error', (error: Error) => {
      console.log(process.pid);
      terminal.writeln(error.message);
    });
    console.log(`PID: ${installProcess.pid}`);
  });
};
