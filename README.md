<h1 align="center"> Carto </h1> <br>
<p align="center">
    <img alt="Carto" title="Carto" src="https://firebasestorage.googleapis.com/v0/b/carto-full-stack.appspot.com/o/assets%2Fg70.png?alt=media&token=463f302b-a007-4a84-9d9a-8f1f7d6d76c8" width="250">

</p>

<p align="center">
  For The Premium Shoppers!
</p>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Features](#features)
- [Feedback](#feedback)
- [Contributors](#contributors)
- [Build Process](#build-process)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

A React Native Powered Shopping App which uses PostgreSQL and Algolia for database duties and also for searching!

<p align="center">
  <img src = "https://firebasestorage.googleapis.com/v0/b/carto-full-stack.appspot.com/o/assets%2FScreenshot_20220331-091724_carto.jpg?alt=media&token=369c9e21-5722-49db-8b10-d9b0a60e302a" width=450>
</p>

## Features

A few of the things you can do on Carto:

- Create new products
- Order products
- Review products
- And many more!

## Feedback

Feel free to [file an issue](https://github.com/Carto-Dev/carto/issues/new/choose). Feature requests are always welcome. If you wish to contribute, please take a quick look at the [guidelines](./CONTRIBUTING.md)!

## Contributors

Please refer the [contribution guidelines](./CONTRIBUTING.md) for exact details on how to contribute to this project.

## Build Process

Here are the instructions on how to build and run this project on your respective systems.

- Clone the project on your system via GitHub.
- Clone the [server](https://github.com/Carto-Dev/carto_server) as well on your system since YASM Mobile works on both NodeJS as well as Firebase.
- Make sure you have [docker](https://www.docker.com/products/docker-desktop) installed on your system.
- Create a [firebase project](https://console.firebase.google.com/) and fetch the `google-services.json` and save it in the `android/app/src/dev` folder.
- Run `docker compose -f docker-compose.yml up --build` in the server root folder to build and run a development version of the server.
- Open up a console and an emulator and run `npx react-native run-android --variant dev` to run the development version of the app.

