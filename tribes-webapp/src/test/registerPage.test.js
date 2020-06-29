import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { RegisterForm } from '../Components/Register/RegisterForm';
import InputField from '../Components/InputField/InputField';
import './enzymeSetup';


describe('Register Form test', () => {
  it('should be clicked when the user submit', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(
      <RegisterForm
        handleLogin={onButtonClick}
      />,
    );
    wrapper.find('form').simulate('submit');
    expect(onButtonClick).to.have.property('callCount', 1);
  });

  it('should has 3 inputfield (username, password, kingdomName)', () => {
    const wrapper = shallow(
      <RegisterForm
        handleLogin={() => { }}
      />,
    );
    expect(wrapper.find(InputField)).to.have.lengthOf(3);
    expect(wrapper.find('#username')).to.have.lengthOf(1);
    expect(wrapper.find('#password')).to.have.lengthOf(1);
    expect(wrapper.find('#kingdomName')).to.have.lengthOf(1);
  });
  it('should display some error message if the username is wrong', () => {
    const wrapper = shallow(
      <RegisterForm
        handleLogin={() => { }}
        regSuccess={false}
        errMessage="username is already exist"
      />,
    );
    expect(wrapper.find('.error')).to.have.lengthOf(1);
    expect(wrapper.find('.error').text()).to.equal('username is already exist');
  });
});
