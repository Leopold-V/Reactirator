module.exports = {
    publishers: [
        {
            name: "@electron-forge/publisher-github",
            platforms: ['darwin', 'linux', 'win32'],
            config: {
            repository: {
                owner: "Leopold-V",
                name: "Reactirator"
            },
            draft: true
            }
        }
    ]
}