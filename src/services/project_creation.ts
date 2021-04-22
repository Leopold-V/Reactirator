const exec = require('child_process').exec;

export const generateProject = (filepath: string, projectName: string): void => {
    try {
        const installProcess = exec(`cd ${filepath} && npx create-react-app ${projectName}`);
        console.log(`cd ${filepath} && npx create-react-app ${projectName}`);
        
        installProcess.stdout.on('data', (data: any) => {
            console.log(data);
        })
        installProcess.stderr.on('data', (data: any) => {
            console.log(data);
        })
        installProcess.on('error', (error: any) => {
            console.error(`error: ${error.message}`);
        });
    } catch (error) {
        console.log(error);
    }
}