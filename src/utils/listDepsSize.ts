const listDepsSize = (listDeps: {name: string, size: number}[]): number => {
    return Math.floor((Object.values(listDeps).reduce((a, b) => a + b.size, 0) / 1000));
}

export default listDepsSize;
