import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../Containers/LoginPage/form.scss';
import InputField from '../../Components/InputField/InputField';
import Navbar from '../../Components/Navbar/Navbar';

export const RegisterForm = ({ handleLogin, regSuccess, errMessage }) => (
  <div>
    <Navbar />
    <div className="container">
      <div className="form-title">Tribes Of Rueppellii</div>
      <form onSubmit={handleLogin}>
        <InputField type="text" id="username" placeholder="desired username" requiredField />
        {!regSuccess ? <div className="error">{errMessage}</div> : null}
        <InputField type="password" id="password" placeholder="password" requiredField />
        <InputField type="text" id="kingdomName" placeholder="kingdom name " />
        <div className="register">
          <input className="register" type="submit" value="sign-up" />
        </div>
      </form>
    </div>
  </div>
);

RegisterForm.propTypes = {
  regSuccess: PropTypes.bool,
  errMessage: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  handleLogin: PropTypes.func.isRequired,
};

RegisterForm.defaultProps = {
  regSuccess: false,
  errMessage: '',
};

export default withRouter(RegisterForm);
