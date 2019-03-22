'use strict';

const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const cors = require('cors')
const jsonToCsv = require('./jsonToCsvLine')

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
app.post('/', (req, res) => {
    const first_name = req.body['first_name']
    const last_name = req.body['last_name']
    const fiscal_code = req.body['fiscal_code']
    const birth_date = req.body['birth_date']
    /* to do: run validation */
    const timestamp = new Date().getTime();
    const output = {timestamp, first_name, last_name, fiscal_code, birth_date} 

    const csvLine = jsonToCsv(output)
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','Content-Type')
    res.setHeader('Access-Control-Allow-Credentials', true);
    /*  to do: manage header field if it's first submit and file is empty */
    fs.appendFile(`./csv/form_data.csv`, csvLine, (err) => {
    if (err){
        res.end(JSON.stringify({result:'ko'}))
        throw err
    };
    res.end(JSON.stringify({result:'ok'}))
    });
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)