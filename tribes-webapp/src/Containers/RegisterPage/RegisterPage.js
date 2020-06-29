import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RegisterForm from '../../Components/Register/RegisterForm';
import { registerUser } from '../../actions/actions';

class Register extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.regSuccess !== prevProps.regSuccess) {
      this.props.history.push('/map');
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    const { username, password, kingdomName } = event.target.elements;
    this.props.registerUser(username.value, password.value, kingdomName.value);
  }

  render() {
    const { regSuccess, errMessage } = this.props;
    return (
      <div>
        <RegisterForm handleLogin={this.handleClick} regSuccess={regSuccess} errMessage={errMessage} />
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  regSuccess: PropTypes.bool,
  errMessage: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Register.defaultProps = {
  regSuccess: false,
  errMessage: '',
};

const mapStateToProps = store => ({
  kingdomName: store.user.kingdomName,
  regSuccess: store.user.regSuccess,
  errMessage: store.user.errMessage,
});

const mapDispatchToProps = {
  registerUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
