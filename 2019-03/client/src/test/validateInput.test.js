import validateInput from '../validation/validateInput.js'

describe('validateInput first_name', function() {
    it('should validate first_name field if longer then 3 chars', function() {
      const inputIsValid2 = validateInput('first_name','aaa').inputIsValid   
      expect(inputIsValid2).toEqual(true)
    })

    it('should not validate first_name field if shorter then 3 chars', function() {
      const inputIsValid = validateInput('first_name','aa').inputIsValid   
      expect(inputIsValid).toEqual(false)
    })

    it('should not validate first_name field if contains numbers', function() {
      const inputIsValid = validateInput('first_name','a23a').inputIsValid  
      expect(inputIsValid).toEqual(false)
    })

    it('should not validate first_name field if contains specialChars', function() {
      const inputIsValid = validateInput('first_name','a@@a').inputIsValid   
      expect(inputIsValid).toEqual(false)
    })
  })

  describe('validateInput last_name', function() {
    it('should validate last_name field if longer then 3 chars', function() {
      const inputIsValid2 = validateInput('last_name','aaa').inputIsValid  
      expect(inputIsValid2).toEqual(true)
    })

    it('should not validate last_name field if shorter then 3 chars', function() {
      const inputIsValid = validateInput('last_name','aa').inputIsValid   
      expect(inputIsValid).toEqual(false)
    })

    it('should not validate last_name field if contains numbers', function() {
      const inputIsValid = validateInput('last_name','a23a').inputIsValid   
      expect(inputIsValid).toEqual(false)
    })

    it('should not validate last_name field if contains specialChars', function() {
      const inputIsValid = validateInput('last_name','a@@a').inputIsValid  
      expect(inputIsValid).toEqual(false)
    })
})
  
  describe('validateInput fiscal_code', function() {
    it('should validate fiscal_code field if qual to 16  chars', function() {
      const inputIsValid2 = validateInput('fiscal_code','1234567890123450').inputIsValid  
      expect(inputIsValid2).toEqual(true)
    })

    it('should not validate fiscal_code field if shorter then 16 chars', function() {
      const inputIsValid = validateInput('fiscal_code','1234567890123').inputIsValid   
      expect(inputIsValid).toEqual(false)
    })

    it('should not validate fiscal_code field if contains specialChars', function() {
      const inputIsValid = validateInput('fiscal_code','a12345678@@12345a').inputIsValid  
      expect(inputIsValid).toEqual(false)
    })
  })

  describe('validateInput birth_date', function() {
    it('should validate birth_date field if is date', function() {
      const inputIsValid2 = validateInput('birth_date', new Date()).inputIsValid   
      expect(inputIsValid2).toEqual(true)
    })

    it('should not validate birth_date field if is a string', function() {
      const inputIsValid = validateInput('birth_date','1234567890123').inputIsValid   
      expect(inputIsValid).toEqual(false)
    })

    it('should not validate birth_date field if is a number', function() {
      const inputIsValid = validateInput('birth_date',2312312).inputIsValid   
      expect(inputIsValid).toEqual(false)
    })
  })