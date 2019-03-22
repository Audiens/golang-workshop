let csvToJson = require('convert-csv-to-json');

module.exports = (req, res) => {

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Access-Control-Allow-Credentials', true);

    let json = csvToJson.getJsonFromCsv(`./csv/form_data.csv`)

    res.end( JSON.stringify(json))
}
