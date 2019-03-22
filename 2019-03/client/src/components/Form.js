import React from 'react'
import PropTypes from 'prop-types'

import Input from './Input'
import InputSubmit from './InputSubmit'

const Form = (props) => {
    const { onSubmit, onChange, onChangeDate, formData, formFields } = props
    return (
        <form onSubmit={ onSubmit } className="csv-form">
            { Object.entries(formFields).map(([inputName, input]) => {
                return <Input
                key={ inputName.toString() }
              inputLabel={ input.label }
              inputType={ input.type }
              inputName={ inputName } 
              inputId={ input.id }
              isValid={input.isValid}
              errorMessage={input.errorMessage}
              isTouched={input.isTouched}
              inputValue={ formData[ inputName ] } 
              inputPlaceholder={ input.placeholder } 
              onChange={ onChange }
              onChangeDate={ onChangeDate }
              />
            })
            }
            <InputSubmit />
        </form>
    )
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired, 
  onChange: PropTypes.func.isRequired, 
  onChangeDate: PropTypes.func.isRequired, 
  formData: PropTypes.objectOf(PropTypes.any).isRequired, /* to do: refine the shape */ 
  formFields: PropTypes.objectOf(PropTypes.any).isRequired, /* to do: refine the shape */ 
};

export default Form
