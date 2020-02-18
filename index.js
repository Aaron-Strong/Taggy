const { AkairoClient, SequelizeProvider } = require('discord-akairo');
const {db, Tags} = require('./logic/database');
const env = require('./env.js');

// Setup bot client
const taggy = new AkairoClient({
    ownerID: env.owner_id, // or ['123992700587343872', '86890631690977280']
    prefix: env.prefix, // or ['?', '!']
    commandDirectory: './commands/',
    inhibitorDirectory: './inhibitors/',
    listenerDirectory: './listeners/',
    handleEdits: true,
    commandUtil: true,
    commandUtilLifetime: 600000,
}, {
    disableEveryone: true
});

// Setup database connection
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

Tags.findAll().then(tags => {
    console.log("All tags:", JSON.stringify(tags, null, 4));
});



taggy.login(env.client_token);
