import { formInputType } from '../helpers/types';
import runCmd from '../utils/runCmd';

export const generateProject = (filepath: string, input: formInputType): void => {
    try {
        runCmd(`cd ${filepath} && npx create-react-app ${input.appname}`);
    } catch (error) {
        console.log(error);
    }
}