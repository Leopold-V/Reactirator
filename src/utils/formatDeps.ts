import { depType } from "../manager/helpers/types";

export const formatDeps = (dependencies: Record<string, string>, isDevDep: boolean) => {
    const newDependencies: Record<string, depType> = {};
    Object.entries(dependencies).forEach((ele) => {
        if (ele[1][0] === '^') {
            newDependencies[ele[0]] = {name: ele[0], version: ele[1].slice(1), status: 'Idle', isDevDep: isDevDep};
        } else {
            newDependencies[ele[0]] = {name: ele[0], version: ele[1], status: 'Idle', isDevDep: isDevDep};
        }
    });
    return newDependencies;
}