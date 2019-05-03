require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const session = require('express-session');
const controller = require('./controller.js');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

app.use(express.json());
app.use( express.static( `${__dirname}/../build` ) );

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log(`The database is set.`);
    app.listen(SERVER_PORT, () => {
        console.log(`The server is listening on port ${SERVER_PORT}`);
    });
});
app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false
}));

app.post('/register', controller.register);
app.post('/login', controller.login);
app.post('/logout', controller.logout);
app.post('/posts', controller.getPosts);
app.get('/post/:id', controller.getActivePost);
app.post('/create', controller.createPost);
app.get('/user', controller.getUser);


