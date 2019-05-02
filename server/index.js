require('dotenv').config();
let express = require('express');
let app = express();
let massive = require('massive');
let controller = require('./controller.js');

let {SERVER_PORT, CONNECTION_STRING} = process.env;

app.use(express.json());

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log(`The database is set.`);
    app.listen(SERVER_PORT, () => {
        console.log(`The server is listening on port ${SERVER_PORT}`);
    });
});


