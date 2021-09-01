const initialStructure = [
    {
        name: 'src',
        ancestor: '',
        isFolder: true,
    },
    {
        name: 'App',
        ancestor: 'src',
        isFolder: false,
    },
    {
        name: 'component',
        ancestor: 'src',
        isFolder: true,
    },
    {
        name: 'SideNav',
        ancestor: 'component',
        isFolder: false,
    },
    {
        name: 'Layout',
        ancestor: 'component',
        isFolder: false,
    }
]

export default initialStructure;