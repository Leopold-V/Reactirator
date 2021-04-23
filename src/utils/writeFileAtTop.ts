const fs = require('fs');

const writeFileAtTop = (filepath: string, filename: string, dataToWrite: string) : void => {
    fs.readFile(`${filepath}\\${filename}`, 'utf8', (err: any, data: any) => {
        if (err) {
            console.log(err);
        }
        fs.writeFile(`${filepath}\\${filename}`, dataToWrite, (err: any) => {
            if (err) {
                console.log(err);
            }
            fs.appendFile(`${filepath}\\${filename}`, data, (err: any) => {
                if (err) {
                    console.log(err);
                }
                console.log('Installation complete');
            });
        });
    });
}

export default writeFileAtTop;