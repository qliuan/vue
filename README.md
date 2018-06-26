# Atlanta Farms, Gardens and Orchards
## CS 4400 Final Project

This is the final project for Georgia Tech CS 4400 in 2018 Spring built using node.js, express.js, and vue.js.

## Getting Started

### Prerequisites
* [node.js](https://nodejs.org/en/) - For the backend
* [express.js](http://expressjs.com/) - The framework used for the backend
* [vue.js](https://vuejs.org/) - The famous frontend framework

## Running the program

Explain how to get the system running

### Before running
The first thing to do is to make sure your nodejs package manager (npm) works. The following command gives you the version of npm that you are using. The project is built on npm 5.6.0
```
npm -v
```

Since all the modules are ignored when uploading to github repo, we have to install all packages required.
(1) go to /client and run
```
npm install
```
(2) go to /server and run
```
npm install
```
These commands would install all the packages described in package.json files in both server and client folders and than the project is ready to start.

### Database
We are using the MySQL server provided by Geogia Tech and it may not be valid after May 2018.
The connection configuration is stated in /server/src/config/config.js, make sure to change it.

### Run the client
After the installing is finished, go to /client and run the client project first
```
npm start
```
and keep it running on the backend

### Run the server
After the installing is finished, go to /server and run the client project first
```
npm start
```
then visit the informed address using browser (Google Chrome is suggested)


## Contributors
* **LIU Qinhan** - [qliuan](https://github.com/qliuan)
* **Lyu Shengrui** - [ShengruiLYU](https://github.com/ShengruiLYU)
* **Xiao Linxi** - [linxixiao](https://github.com/linxixiao)
