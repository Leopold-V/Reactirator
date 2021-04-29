const manageSpecialCases = (input: string, packageJson: any) => {
    if (!packageJson.dependencies['bootstrap']) {
        packageJson.dependencies['bootstrap'] = "4.6.0";
    } else {
        delete packageJson.dependencies['bootstrap'];
    }
    return {...packageJson};
}

export default manageSpecialCases;