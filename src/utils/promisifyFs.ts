//@ts-nocheck
import fs from 'fs';

export const promisifyReadFs = (fullpath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${fullpath}`, 'utf8', (err: Error, data: string) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export const promisifyWriteFs = (fullpath: string, dataToWrite: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${fullpath}`, dataToWrite, (err: Error, data: string) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export const promisifyAppendFs = (fullpath: string, dataToWrite: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.appendFile(`${fullpath}`, dataToWrite, (err: Error, data: string) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
