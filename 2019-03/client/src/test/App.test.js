import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from '../App';
import Form from '../components/Form';
import Input from '../components/Input';
import defaultState from '../config/defaultState'
configure({ adapter: new Adapter() })

it('App state should be like defaultState', () => {
  const div = document.createElement('div');
  const app = shallow(<App />, div)
  const instance = app.instance()
  expect(instance.state).toEqual(defaultState);
});

it('App should render the correct number of elements', () => {
    const div = document.createElement('div');
    const app = ReactDOM.render(<App />, div);
    expect(div.querySelectorAll('input[type=text]').length).toEqual(4);
    expect(div.querySelectorAll('form').length).toEqual(1);
    expect(div.querySelectorAll('label').length).toEqual(4);
    expect(div.querySelectorAll('h1').length).toEqual(1);
    expect(div.querySelectorAll('input[type=submit]').length).toEqual(1);
    expect(div.querySelectorAll('fieldset').length).toEqual(4);
  });

  it('Form submit should call the right function', () => {
    const onSubmitFn = jest.fn();
    const wrapper = mount(<Form 
        onSubmit={onSubmitFn}
        formFields={{}}
        onChange={jest.fn()}
        onChangeDate={jest.fn()}
        formData={{}}
        />);
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(onSubmitFn).toHaveBeenCalledTimes(1);
  });

  it('Input change should call the right function', () => {
    const onChangeFn = jest.fn();
    const wrapper = mount(<Input 
        inputName={''}
        inputId={''}
        isValid={false}
        isTouched={false}
        onChange={onChangeFn}
        onChangeDate={() => {}}
        />);
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'something' } });
    expect(onChangeFn).toHaveBeenCalledTimes(1);
  });