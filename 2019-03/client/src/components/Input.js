import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Input = (props) => {
    const { onChange, onChangeDate, inputValue,  inputLabel, inputId, inputName, inputType, inputPlaceholder, isValid, isTouched, errorMessage } = props
    let input = <input type={ inputType } name={ inputName } id={ inputId } value={ inputValue } placeholder={ inputPlaceholder } onBlur={ onChange } onChange={ onChange } />
    if(inputType === 'date'){
        const today = new Date()
        input = <DatePicker
                    selected={ inputValue || null }
                    onChange={ onChangeDate }
                    maxDate={ today }
                    placeholderText={ inputPlaceholder }
                    name={ inputName } 
                    id={ inputId }
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                />
    }

    const fieldsetClass = !isValid && isTouched ? 'error' : null
    const errorMessageElement = !isValid && isTouched ? <span>{errorMessage}</span> : null
    return (
        <fieldset className={ fieldsetClass }>
            <label htmlFor={ inputId }>{inputLabel}</label>
            {input}
            {errorMessageElement}
        </fieldset>
    )
}

Input.propTypes = {
    onChange: PropTypes.func.isRequired,
    onChangeDate: PropTypes.func.isRequired,
    inputValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date)
    ]),
    inputLabel: PropTypes.string,
    inputName: PropTypes.string.isRequired,
    inputType: PropTypes.string,
    inputId: PropTypes.string.isRequired,
    inputPlaceholder: PropTypes.string,
    isValid: PropTypes.bool.isRequired, 
    isTouched: PropTypes.bool.isRequired,
  };

Input.defaultProps = {
    inputValue: '',
    inputLabel: '',
    inputType: 'text',
    inputPlaceholder: ''
}

export default Input
