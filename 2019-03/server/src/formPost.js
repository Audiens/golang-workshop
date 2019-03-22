import fs from 'fs'
import jsonToCsv from './jsonToCsvLine'

export default (req, res) => {
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
  }