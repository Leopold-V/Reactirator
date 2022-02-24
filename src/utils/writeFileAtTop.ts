import { promisifyReadFs, promisifyWriteFs, promisifyAppendFs } from './promisifyFs';

export const writeFileAtTop = async (fullpath: string, dataToWrite: string): Promise<void> => {
  const data = await promisifyReadFs(fullpath);
  await promisifyWriteFs(fullpath, dataToWrite);
  await promisifyAppendFs(fullpath, data);
};
