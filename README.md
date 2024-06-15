<div align="center">
    <img src="/public/assets/icon/full-logo.png" height="100px">
   <img src="/screenshots/full-ss.png">
    <h1> Individual project SPTech School </h1>
  <p>Project developed in the first semester of SPTech School, Research and Innovation</p>
</div>

# Clash Metrics

The theme I chose is Clash Royale, where players will register and be able to link using the Supercell Gamertag, and thus access the platform and have a critical and detailed analysis of their personal account, being able to have a better analysis of development and game progress.

<div align="center">
   <img src="/screenshots/dashboard-ss.png">
</div>


## Development
The technologies used in the development of the project were HTML5, CSS3, and JS Ecma for Frontend, Node JS + Express in the Backend with support from EJS for renderer, while MySQL was used in the database. The entire project was structured and based on design MVC pattern.
To complement my learning, I wanted to challenge myself with the use of different modules and features, such as the use of an External API using the official Supercell API to link and obtain player data, and the use of the websockets protocol for bidirectional communication in real time for Chat functionality

## Installation
Before booting the installation, make sure to create an account to obtain the official Supercell API key, create your account here: [https://developer.clashroyale.com/#/](https://developer.clashroyale.com/#/). If you have a server to enter the IP, ignore the following explanation: If you do not have a server, you will need to use a Proxy to guarantee your API Key, you can use the Royale API proxy available here: [https://docs.royaleapi.com/proxy.html](https://docs.royaleapi.com/proxy.html). Finally, also make sure you have NodeJS installed and updated, as well as MySQL and NPM to proceed.


Clone this repository with the following command in your cmd
```bash
git clone https://github.com/jeancharlesx64/clash-metrics
```
Access the cloned directory using the command
```bash
cd clash-metrics
```
open your coding IDE, if you use Visual Studio Code, use the command to open automatically
```bash
code .
```


Access the src/configs/database directory and have access to the database base structure script, create the structure using MySQL and then create an environment variables file and make the necessary changes, use .env-example as support
After the configuration of the entire environment has been completed, to initialize the web server, go to cmd and execute the command
```bash
node app.js
```
Ready, make sure that the connection to the database has been made and then access the web platform in your browser. Happy studying!
