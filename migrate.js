const {db, Tags} = require('./logic/database');

db.authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.');
    Tags.sync({ force: true }).then(() => {
        console.log("Table synced successfully");
        process.exit();
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit();
});

