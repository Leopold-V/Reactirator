import fs from 'fs';
import { nanoid } from 'nanoid';
import { FileStructureType } from '../manager/helpers/types';

const readSrcFolder = async (path: string): Promise<FileStructureType[]> => {
  const projectSrc: FileStructureType[] = [];
  fs.readdir(path, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      projectSrc.push({
        id: nanoid(6),
        name: file,
        ancestor: '',
        isFolder: false,
        path: `${path}/${file}`,
      });
      console.log(file);
    });
  });
  return projectSrc;
};

export default readSrcFolder;
