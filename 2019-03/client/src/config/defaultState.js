const DEFAULT_STATE = {
  formData: {
    'first_name':'',
    'last_name':'',
    'email':'',
    'fiscal_code':'',
    'birth_date': null
  },
  formStatus: {
    isValid: false,
    isTouched: false,
    isSent: false,
  },
  formFields: {
    'first_name': {label:'Nome', placeholder:'Nome',  id:'firstName', isTouched: false, isValid: false, errorMessage: '' },
    'last_name': {  label:'Cognome', placeholder:'Cognome',  id:'lastName', isTouched: false, isValid: false, errorMessage: '' },
    'email': {  label:'Email', placeholder:'Email',  id:'email', isTouched: false, isValid: false, errorMessage: '' },
    'fiscal_code': { label:'Codice fiscale', placeholder:'Codice fiscale',  id:'fiscalCode', isTouched: false, isValid: false, errorMessage: '' },
    'birth_date': { label:'Data di nascita', placeholder:'Data di nascita',  id:'birthDay', type: 'date', isTouched: false, isValid: false, errorMessage: '' },
},
}

export default DEFAULT_STATE
