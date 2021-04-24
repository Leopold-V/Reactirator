const exec = require('child_process').exec;

const runCmd = (cmd: string, callback?: any) => {
    return new Promise((resolve, reject) => {
        const installProcess = exec(cmd, (error: Error, data: any) => {
            if (error) {
                reject(console.log(error));
            }
            if (callback) {
                resolve(callback());
            } else {
                resolve(data);
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
    })
}

export default runCmd;
