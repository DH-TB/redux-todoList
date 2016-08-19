"use strict";

function server() {
    const express = require('express');

    const bodyParser = require('body-parser');
    const app = new express();
    const session = require('express-session');

    app.use(bodyParser.urlencoded({extended: true}));

    app.use(express.static('./views'));

    app.use(express.static('./public'));
    app.use(express.static('./dist'));
    app.use(session({
        secret: 'a',
        resave: true,
        saveUninitialized: true,
    }));
    var server = app.listen(3000, function () {
        var port = server.address().port;
        console.log('listening at port %s', port);
    });

    return server;
}

module.exports = server;
