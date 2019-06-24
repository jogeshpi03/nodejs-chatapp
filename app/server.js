const express = require('express');
const bodyParser = require('body-parser');
const socket_io = require('socket.io');

const frontRoute = require('./routes/frontend');
const config = require('./../config');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(frontRoute);


var server = app.listen(config.port, config.hostname, () => {
    console.log(`app running on http://${config.hostname}:${config.port}`);
});

const io = socket_io.listen(server);

io.on('connection', (socket) => {
    socket.on('chat_window', (message) => {
        io.emit('chat_window', message);
    });
});