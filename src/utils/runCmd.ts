const exec = require('child_process').exec;

const runCmd = (cmd: string, callback?: any) : void => {
    const installProcess = exec(cmd, (error: Error) => {
        if (error) {
            console.log(error);
        }
        if (callback) {
            callback();
        }
    });
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
