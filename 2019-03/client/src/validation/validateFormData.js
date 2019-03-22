import validateInput from './validateInput'

const validateFormData = (formData) => {
    let formIsValid = true
    Object.entries(formData).forEach(([ inputName, inputValue ]) => {
        const inputValidation = validateInput(inputName,inputValue).inputIsValid
        if(!inputValidation){
            formIsValid = false
        }
    });
    return formIsValid
}

export default validateFormData