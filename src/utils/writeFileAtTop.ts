import { promisifyReadFs, promisifyWriteFs, promisifyAppendFs } from './promisifyFs';

export const writeFileAtTop = async (fullpath: string, dataToWrite: string) => {
    try {
        const data: any = await promisifyReadFs(fullpath);
        await promisifyWriteFs(fullpath, dataToWrite);
        await promisifyAppendFs(fullpath, data);
    } catch (error) {
       throw error;
    }
};

/*export const writeFileAtTop = (filepath: string, filename: string, dataToWrite: string) : void => {
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
};*/