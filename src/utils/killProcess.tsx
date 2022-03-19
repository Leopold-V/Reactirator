import { spawnSync } from 'child_process';
import os from 'os';
import psTree from 'ps-tree';

const isWin = /^win/.test(os.platform());

// TODO: to test
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
