module.exports = {
    publishers: [
        {
            name: "@electron-forge/publisher-github",
            config: {
            repository: {
                owner: "Leopold-V",
                name: "cra-generator"
            },
            draft: true
            }
        }
    ]
}