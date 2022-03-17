export const formatDeps = (dependencies: Record<string, string>) => {
    const newDependencies: Record<string, string> = {};
    Object.entries(dependencies).forEach((ele) => {
        newDependencies[ele[0]] = ele[1].slice(1);
    });
    return newDependencies;
}