const findStarter = (packageJson: any) => {
    if (packageJson.dependencies['react-scripts']) {
        return 'CRA';
    }
    if (packageJson.dependencies.next) {
        return 'next';
    }
    if (packageJson.dependencies.gatsby) {
        return 'gatsby';
    }
    if (packageJson.dependencies['remix'] || packageJson.dependencies['@remix-run/react']) {
        return 'remix';
    }
    if (packageJson?.devDependencies.vite) {
        return 'vite';
    }
    return '';
}

export default findStarter;