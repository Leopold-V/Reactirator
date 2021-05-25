<h1 align="center">Welcome to cra-generator 👋</h1>
<h3 align="center">An open source application to generate a react application, with packages installation and configuration automatized</h3>
<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/Leopold-V/cra-generator" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

## What is it ?

Desktop application built with Electron using TypeScript, React and Node. 
The objective is to provide a simple UI to help you automatized everything related to the installation of a react application when starting a project so you can start in no time.

It avoid you to repeat boring task such as installing/config tailwind, bootstrap etc. and every npm packages. Under the hood the application automatized all of this by running cli command at your place.
More cool stuffs are there such as npm packages informations, a real time package.json to know what's your are actually generated, a drag and drop to switch your packages between dep and dev dependencies etc.

In the long run the project goal is to extend the possible customizations providing you more control over the generation and more interest to use this project.

Everything is generated on top of [create-react-app](https://github.com/facebook/create-react-app) so you don't have to worry about the base project requirements such as bundlers, tests etc.

## Features

- Generate a react application with create-react-app.
- Auto install->config a couple of famous packages which usually require file edits and more in depts research to configure such as [tailwind configuration](https://tailwindcss.com/docs/guides/create-react-app) in a create-react-app project
- Search npm packages and auto install them.
- Drag and drop your packages between dependencies and dev dependencies.
- Have information about packages such as the installation size.
- Vizualize your package.json informations in real time.

TODO :

- [ ] Hover a package must show complete package information.
- [ ] Add the possibility to custom the scripts section of the package.json .
- [ ] The custom packages like bootstrap in the form aren't includes in the extra dependencies package for now.
- [ ] Add loader for the packages search.

## Usage

```sh
git clone https://github.com/Leopold-V/cra-generator.git
```

```sh
npm run start
```

## Want to Contribute ?

TODO : write contributing guide

## 📸 Screenshots

![screen](https://i.gyazo.com/58a84c811dd3f62eaed2279c785a95fd.png)

## Author

👤 **Leopold-V**

* Github: [@Leopold-V](https://github.com/Leopold-V)

## Show your support

Give a ⭐️ if this project helped you!
