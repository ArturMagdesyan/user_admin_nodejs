// Get dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Config
const config = require('./config');

// Get our API routes
const api = require('./server/routes');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add headers
app.use(function (req, res, next) {
    
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, application/json, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware

    next();
});

// Set our api routes
app.use('/api', api);

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(config.server.port, () => {
  console.log(`Example app listening on port ${config.server.port}`);
});