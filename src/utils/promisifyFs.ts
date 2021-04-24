const fs = require('fs');

export const promisifyReadFs = (filepath: string, filename: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(`${filepath}\\${filename}`, 'utf8', (err: Error, data: string) => {
            if (err) {
                reject(err)
            }
            resolve(data);
        })
    })
}

export const promisifyWriteFs = (filepath: string, filename: string, dataToWrite: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${filepath}\\${filename}`, dataToWrite, (err: Error, data: string) => {
            if (err) {
                reject(err)
            }
            resolve(data);
        })
    })
}

export const promisifyAppendFs = (filepath: string, filename: string, dataToWrite: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.appendFile(`${filepath}\\${filename}`, dataToWrite, (err: Error, data: string) => {
            if (err) {
                reject(err)
            }
            resolve(data);
        })
    })
}