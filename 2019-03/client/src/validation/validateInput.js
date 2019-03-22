import { validateConfiguration, validationMessages } from './config'

const inputIsValid = (inputName,inputValue) => {
    const inputValidateConfiguration = validateConfiguration[ inputName ];
    let inputIsValid = true
    let inputErrorMessage = ''
    inputValidateConfiguration.map((inputValidation) => {
        Object.entries(inputValidation).forEach(([ validationKey, validationValue ]) => {
            let inputConditionIsValid
            switch(validationKey){
                case 'minLenght':
                    inputConditionIsValid = inputValue.length >= validationValue
                    break
                case 'maxLenght':
                    inputConditionIsValid = inputValue.length <= validationValue
                    break
                case 'noNumbers':
                    inputConditionIsValid = !/\d/.test(inputValue)
                    break
                case 'noSpecialChars':
                    inputConditionIsValid = !/[^a-zA-Z0-9]/.test(inputValue)
                    break
                case 'isDate':
                    inputConditionIsValid = (inputValue instanceof Date && !isNaN(inputValue.valueOf()))
                    break
                case 'email':
                    inputConditionIsValid = /^\w+(.]?\w+)*@\w+([.]?\w+)*(\.\w{2,3})+$/.test(inputValue)
                    break
                default:
                    inputConditionIsValid = true
            }
            if(!inputConditionIsValid){
                inputIsValid = false
                inputErrorMessage = validationMessages[ validationKey ]
            }

        })
        return true
    })
    return { inputIsValid, inputErrorMessage }
}

export default inputIsValid
