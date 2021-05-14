const exec = require('child_process').exec;

const runCmd = (cmd: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const installProcess = exec(cmd, (error: Error, data: string) => {
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

export default runCmd;
