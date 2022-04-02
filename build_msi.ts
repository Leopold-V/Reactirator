/* eslint-disable @typescript-eslint/no-var-requires */
const { MSICreator } = require('electron-wix-msi');
const path = require('path');

const APP_DIR = path.resolve(__dirname, './out/reactirator-win32-x64');
const OUT_DIR = path.resolve(__dirname, './windows_installer');

const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,
    description: 'A React application manager tool',
    exe: 'Reactirator',
    name: 'Reactirator installation',
    manufacturer: 'Leopold Vertadier',
    version: '1.0.0-beta',
    appIconPath: path.resolve(__dirname,'./src/assets/icons/win/icon.ico'),
    ui: {
        enabled: false,
        chooseDirectory: true,
    },
});

msiCreator.create().then(function(){
    msiCreator.compile();
});