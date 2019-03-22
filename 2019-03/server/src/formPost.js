import fs from 'fs'
import jsonToCsv from './jsonToCsvLine'
import validateInput from '../../client/src/validation/validateInput'

export default (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Headers','Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', true);

  const result = {
    result: 'ok',
    errors: [],
  }

  Object.keys(req.body).forEach(field => {
    const { inputIsValid, inputErrorMessage } = validateInput(field, req.body[field])

    if (!inputIsValid) {
      result.result = 'ko'
      result.errors.push({field, error: inputErrorMessage})
    }
  })

  if (result.errors.length) {
    res.statusCode = 400
    res.end(JSON.stringify(result))

    return
  }

  const { first_name, last_name, fiscal_code, birth_date } = req.body
  const timestamp = new Date().getTime();
  const output = {timestamp, first_name, last_name, fiscal_code, birth_date} 

  const csvLine = jsonToCsv(output)
  /*  to do: manage header field if it's first submit and file is empty */
  fs.appendFile(`./csv/form_data.csv`, csvLine, (err) => {
    if (err){
        res.end(JSON.stringify({result:'ko'}))
        throw err
    };
    res.end(JSON.stringify(result))
  });
}