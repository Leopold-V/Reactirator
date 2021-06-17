<h1 align="center">Welcome to Reactirator <span><img alt="icon" src="https://github.com/Leopold-V/Reactirator/blob/main/public/icons/png/32x32.png" /></span></h1>
<h3 align="center">An open source application to generate a react application, with packages installation and configuration automatized</h3>
<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/Leopold-V/Reactirator" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>
<div align="center">
  <img alt="screen" src="https://i.gyazo.com/8e3320905a53b17be5d342f353da0f30.png" />
</div>

## What is it ?

Reactirator is a desktop application built with Electron using TypeScript, React and Node.
The objective is to provide a simple UI to create a react application with any configs and packages you want without ever touching a cmd.
So you can start a project in no time.

Reactirator aims to be very beginner friendly but also to be a real time saver for more confirmed developper : get ride of the configs steps and focus on your code.

For example you won't have to repeat boring task such as installing/config tailwind, bootstrap etc. and every npm packages. Under the hood the application automatized all of this by running cli commands.
More cool stuffs are there such as npm packages informations, a real time package.json to know what your are actually generating, a drag and drop system to switch your packages between dependencies and dev dependencies etc.

In the long run the project goal is to extend the possible customizations providing you more control over the generation and more advantages to use this project.

Everything is generated on top of [create-react-app](https://github.com/facebook/create-react-app) so you don't have to worry about the base project requirements such as bundlers, tests etc.

## Features

- Generate a react application on top of create-react-app.
- Auto install->config a couple of famous packages which usually require files edit and sometimes more in depts research to configure such as [tailwind configuration](https://tailwindcss.com/docs/guides/create-react-app) in a create-react-app project
- Search npm packages and auto install them.
- Drag and drop your packages between dependencies and dev dependencies.
- Have information about packages such as the installation size, a short description and npm score.
- Vizualize your package.json informations in real time.

## Usage

To use Reactirator you can either download binaries files in the [release section](https://github.com/Leopold-V/Reactirator/releases)
or clone the project and test it in your dev environment :

```sh
git clone https://github.com/Leopold-V/Reactirator.git
```
```sh
npm install
```
```sh
npm run start
```

## Todo

- [ ] improve global styles
- [ ] Add the possibility to custom the scripts section of the package.json.
- [ ] The request module to get npm registry data is slow.
- [ ] The custom packages like bootstrap in the form aren't includes in the extra dependencies package for now.
- [ ] add tests

## Want to Contribute ?

Reactirator is open to any contributions, even if you are a beginner and you are looking for you first contribution you are welcome !
If you notice a bug, have a feature or enhancement to propose, don't hesitate to open a pull request and if you need help as well.

Please respect the contributor [Code Of Conduct](https://github.com/leopold-v/Reactirator/blob/main/CODE_OF_CONDUCT.md)

## Author

👤 **Leopold-V**

## Show your support

Give a ⭐️ if this project helped you!
