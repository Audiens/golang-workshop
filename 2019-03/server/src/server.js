'use strict';
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import formPostAction from './formPost'

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


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)