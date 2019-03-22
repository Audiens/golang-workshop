import React, { Component } from 'react'
import Form from './components/Form';
import DEFAULT_STATE from './config/defaultState'
import './App.css'
import validateInput from './validation/validateInput'
import formIsValid from './validation/validateFormData'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;

    this.handleChange = this.handleChange.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeFormStatus = this.changeFormStatus.bind(this)
  }

  changeFormStatus(key,value) {
    this.setState(prevState => ({
      formStatus:{
        ...prevState.formStatus,
        [ key ] : value, 
      } }));
  }

  resetForm() {
    this.setState(DEFAULT_STATE);
  }

  handleChange(e) {
    e.persist()
    this.setState(prevState => ({
      formData:{
        ...prevState.formData,
        [ e.target.name ] : e.target.value, 
      } }));
    this.changeFormStatus('isTouched',true)
    const { inputIsValid, inputErrorMessage } = validateInput(e.target.name, this.state.formData[e.target.name])
    this.setState(prevState => ({
      formFields:{
        ...prevState.formFields,
        [ e.target.name ] : {...prevState.formFields[e.target.name], isTouched: true, isValid: inputIsValid, errorMessage: inputErrorMessage}, 
      } }));
  }

  handleChangeDate(value) {
    const dateInputName = 'birth_date'
  
    this.setState(prevState => ({
      formData:{
        ...prevState.formData,
        [ dateInputName ] : value, 
      } }));
      this.changeFormStatus('isTouched',true)
      const { inputIsValid, inputErrorMessage } = validateInput(dateInputName, this.state.formData[dateInputName])
      this.setState(prevState => ({
        formFields:{
          ...prevState.formFields,
          [ dateInputName ] : {...prevState.formFields[dateInputName], isTouched: true, isValid: inputIsValid, errorMessage: inputErrorMessage}, 
        } }));
  }

  validateForm(){
    Object.entries(this.state.formFields).map(([inputName, input]) => {
    const { inputIsValid, inputErrorMessage } = validateInput(inputName, this.state.formData[inputName])
    this.setState(prevState => ({
      formFields:{
        ...prevState.formFields,
        [ inputName ] : {...prevState.formFields[inputName] ,isTouched: true, isValid: inputIsValid, errorMessage: inputErrorMessage}, 
      } }));
      return true
    })
  }

  handleSubmit(e) {
    this.validateForm()
    if(formIsValid(this.state.formData)){
      this.changeFormStatus('isValid',true)
      this.changeFormStatus('isSending',true)
      fetch('http://0.0.0.0:8080',{
        method: 'post',
        headers: new Headers(
          {"Content-Type": "application/json",
           "Accept":"application/json"}
       ),
        body: JSON.stringify(this.state.formData),
      })
      .then(response => response.json())
      .then(responseJson => {
        this.changeFormStatus('isSent',true)
        if(responseJson.result !== 'ok'){
          this.changeFormStatus('isValid',false)
        }
        this.changeFormStatus('isSending',false)
      })
    }
    e.preventDefault()
  }

  render() {

    let output =  <React.Fragment>
        <h1>Aggiungi un'anagrafica</h1>
        <Form 
      onSubmit={ this.handleSubmit }
      onChange={ this.handleChange }
      onChangeDate={ this.handleChangeDate }
      formData={ this.state.formData }
      formFields={ this.state.formFields }
     />
    </React.Fragment>

     if(this.state.formStatus.isSent && this.state.formStatus.isValid){
        output = <div className="message valid">Anagrafica aggiunta correttamente. <a href="http://localhost:3000" onClick={ this.resetForm }>Vuoi aggiungerne un'altra?</a></div>
     }

     if(this.state.formStatus.isSent && !this.state.formStatus.isValid){
      output = <div className="message errors">Errore nell'aggiunta dell'anagrafica. <a href="http://localhost:3000" onClick={ this.resetForm }>Vuoi riprovare?</a></div>
     }

     if(this.state.formStatus.isSending){
      output = <div className="message info">Invio in corso...</div>
     }
    
    return (
        <div id="container">
            {output}
        </div>
    );
  }
}

export default App;
