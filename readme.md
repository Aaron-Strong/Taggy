# Taggybot
## Requirements
```
A moderatly updated version of node, tested on v10

mysql or mariadb
```

## Config
Rename env.js.example to env.js and fillout the following...

Client information can be found at https://discordapp.com/developers/applications
```env
owner_id: "bot owner's discord ID here, can be an array of multiple owners",
prefix: "", // prefix to start the bot, i.e. !, ., /, \
client_id: "", // bot's client_id found on discord developer site
client_secret: "", // bot's client_secret found on discord developer site
client_token: "", // bot's client_token found on discord developer site
db_username: "", // mysql database username
db_password: "", // mysql database password
db_name: "", // mysql database name
db_host: "", // mysql database host
blacklist: [""] // Any 
```

## Installation
```Bash
git clone https://github.com/MilkyMiku/Taggy
// Make sure to edit env.js before these steps
cd Taggy
yarn install
yarn migrate
```
## Running the app
```Bash
yarn start
```

## Running on a server
I recommend using pm2 to run the bot on a server.
```Bash
// Install pm2 globally
sudo yarn global pm2

git clone https://github.com/MilkyMiku/Taggy
// Make sure to edit env.js before these steps
cd Taggy
yarn install
yarn migrate

// Running the app
pm2 start index.js 
