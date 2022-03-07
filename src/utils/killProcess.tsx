import { spawn, spawnSync } from 'child_process';
import os from 'os';
import psTree from 'ps-tree';

const isWin = /^win/.test(os.platform());

/*
export const killProcess = (id: number) => {
  const running_task = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run'], {
    shell: false,
  });
};
*/

// TODO: to test
export const killProcess = (doomedProcessId: any): Promise<any> => {
    return new Promise(resolve => {
      console.log('hello ' + doomedProcessId);
      if (isWin) {
        // For Windows Support
        // On Windows there is only one process so no need for psTree (see below)
        // We use /f for focefully terminate process because it ask for confirmation
        // We use /t to kill all child processes
        // More info https://ss64.com/nt/taskkill.html
        resolve(
          spawnSync('taskkill', [
            '/pid',
            doomedProcessId,
            '/f',
            '/t',
          ])
        );
      } else {
        psTree(doomedProcessId, (err: Error, children: psTree.PS[]) => {
          if (err) {
            console.error('Could not gather process children:', err);
            //@ts-ignore
            return resolve();
          }
  
          const childrenPIDs = children.map((child: any) => child.PID);
          resolve(
            spawnSync('kill', [
              '-9',
              doomedProcessId,
              ...childrenPIDs,
            ])
          );
        });
      }
    });
  };