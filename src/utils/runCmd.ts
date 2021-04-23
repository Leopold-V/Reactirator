const exec = require('child_process').exec;

const runCmd = (cmd: string) : void => {
    const installProcess = exec(cmd);
    installProcess.stdout.on('data', (data: any) => {
        console.log(data);
    })
    installProcess.stderr.on('data', (data: any) => {
        console.log(data);
    })
    installProcess.on('error', (error: any) => {
        console.error(`error: ${error.message}`);
    });
}

export default runCmd;