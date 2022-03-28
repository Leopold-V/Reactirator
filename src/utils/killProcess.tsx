import { spawnSync } from 'child_process';
import os from 'os';
import psTree from 'ps-tree';

// This function has been copied from:
// https://github.com/joshwcomeau/guppy/blob/master/src/services/kill-process-id.service.js
// All credit to his creator.

// TODO:
// Convert to ES6 async/await.
const isWin = /^win/.test(os.platform());

export const killProcess = (doomedProcessId: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (isWin) {
      resolve(spawnSync('taskkill', ['/pid', doomedProcessId, '/f', '/t']));
    } else {
      psTree(doomedProcessId, (err: Error, children: psTree.PS[]) => {
        if (err) {
          console.error('Could not gather process children:', err);
          return reject(err.message);
        }
        const childrenPIDs = children.map((child: any) => child.PID);
        resolve(spawnSync('kill', ['-9', doomedProcessId, ...childrenPIDs]));
      });
    }
  });
};

export const killAllProcess = async (listProcess: { pid: number; taskName: string }[]) => {
  console.log('kill all running process');
  const newListProcess = [...listProcess];
  if (listProcess.length > 0) {
    try {
      listProcess.forEach(async (ele) => {
        await killProcess(ele.pid);
        newListProcess.filter((ele2) => (ele2.pid = ele.pid));
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  return newListProcess;
}