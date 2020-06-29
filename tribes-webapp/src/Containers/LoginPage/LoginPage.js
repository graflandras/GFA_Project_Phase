import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLoginName } from '../../actions/actions';
import LoginForm from '../../Components/Login/LoginForm';
import './form.scss';

export class Login extends Component {
  componentWillUpdate() {
    if (this.props.isAuthenticating) {
      this.props.history.push('/kingdom/buildings');
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;
    this.props.getLoginName(username.value, password.value);
    if (this.props.isAuthenticated) {
      this.props.history.push('/kingdom/buildings');
    }
  }

  render() {
    const { loginError, errMessage } = this.props;
    return (
      <div>
        <LoginForm handleSubmit={this.handleSubmit} loginError={loginError} errMessage={errMessage} />
      </div>
    );
  }
}

Login.propTypes = {
  isAuthenticating: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  getLoginName: PropTypes.func.isRequired,
  loginError: PropTypes.bool.isRequired,
  errMessage: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Login.defaultProps = {
  isAuthenticating: false,
  isAuthenticated: false,
  errMessage: '',
};

const mapStateToProps = store => ({
  isAuthenticating: store.user.isAuthenticating,
  isAuthenticated: store.user.isAuthenticated,
  givenUsername: store.user.username,
  errMessage: store.user.errMessage,
  loginError: store.user.loginError,
});

const mapDispatchToProps = {
  getLoginName,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
