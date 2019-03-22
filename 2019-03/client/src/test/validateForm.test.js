import validateFormData from '../validation/validateFormData'

describe('validateFormData', function() {
    it('should validate form with valid data', function() {
      const formIsValid = validateFormData({
        'first_name':'aaa',
        'last_name':'aaa',
        'fiscal_code':'0123456789123456',
        'birth_date': new Date()
      })  
      expect(formIsValid).toEqual(true)
    })

    it('should not validate form with empty fields', function() {
      const formIsValid = validateFormData({
        'first_name':'',
        'last_name':'',
        'fiscal_code':'',
        'birth_date': ''
      })    
      expect(formIsValid).toEqual(false)
    })

    it('should validate form with not valid data', function() {
      const formIsValid = validateFormData({
        'first_name':'aaa',
        'last_name':'aa',
        'fiscal_code':'0123456789123456',
        'birth_date': new Date()
      })   
      expect(formIsValid).toEqual(false)
    })
  })
