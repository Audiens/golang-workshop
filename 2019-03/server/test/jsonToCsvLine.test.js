const jsonToCsvLine = require('../src/jsonToCsvLine')

describe('jsonToCsv ', function() {
    it('should accept json and return a valid csv line', function() {
      const json = {"first_name":"mauro","last_name":"accornero","fiscal_code":"eeeeeeeeeeeeeeeee3","birth_date":"2019-02-26T23:00:00.000Z"}
      const csv = jsonToCsvLine(json)  
      expect(csv).toEqual("mauro,accornero,eeeeeeeeeeeeeeeee3,2019-02-26T23:00:00.000Z\n")
    })
  })