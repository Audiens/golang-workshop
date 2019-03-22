'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const formPostAction = require('./formPost')
const wsCsvJson = require('./wsCsvJson')

var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

// Constants
const PORT = 8080;
const HOST = '0.0.0.0'

// App
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors())
app.post('/', formPostAction);
app.get('/c2j', wsCsvJson);


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)
