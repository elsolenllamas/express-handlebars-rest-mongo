#!/usr/bin/env node

var app = require('../app');
var http = require('http');

var port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

var server = http.createServer(app);
module.exports = app;