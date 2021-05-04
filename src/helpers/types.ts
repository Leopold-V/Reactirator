export type formInputType = {
    appname: string,
    typescript: boolean,
    prettier: boolean,
    flow: boolean,
    tailwind: boolean,
    bootstrap: boolean,
    reactbootstrap: boolean,
    materialui: boolean,
    styledcomponents: boolean,
    normalize: boolean,
    reactrouter: boolean,
    proptypes: boolean,
    sourcemapexplorer: boolean,
    storybook: boolean
}

export type actionPackageType = {
    type: string,
    payload: {
        category: string,
        name: string
    }
}

export type actionJsonType = {
    type: string,
    payload: {
        name: string,
        version: string
    } | string
}

export type listPackageType = {
    name: string,
    version: string
}[]

export type depStateType = {
    //[key: string]: string[]
    dependencies: string[],
    devDependencies: string[]
}

export type argType = [
    filepath: string,
    input: formInputType
]