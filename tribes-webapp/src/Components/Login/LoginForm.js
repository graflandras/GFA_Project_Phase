import React from 'react';
import PropTypes from 'prop-types';
import '../../Containers/LoginPage/form.scss';
import InputField from '../InputField/InputField';
import Navbar from '../Navbar/Navbar';

const LoginForm = ({
  handleSubmit, loginError, errMessage,
}) => (
  <div>
    <Navbar />
    <div className="container">
      <div className="form-title">Tribes Of Rueppellii</div>
      <form className="white" onSubmit={handleSubmit}>
        <InputField type="text" id="username" placeholder="Username" requiredField />
        <InputField type="password" id="password" placeholder="Password" requiredField />
        {loginError ? <div><p className="text-danger">{errMessage}</p></div> : null}
        <div className="Login">
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  </div>);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loginError: PropTypes.bool.isRequired,
  errMessage: PropTypes.string,
};

LoginForm.defaultProps = {
  errMessage: '',
};

export default LoginForm;
