import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from '../HeaderHome';
import './navbar.scss';
import NavbarButtons from './NavbarButtons';

class Navbar extends Component {
  handleClick = (event) => {
    if (event.target.name === 'Logout') {
      localStorage.removeItem('TOKEN');
      this.props.history.push('/login');
    } else {
      this.props.history.push(`/${event.target.name}`);
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light ">
        {this.props.loggedin ? <Header content="My Kingdom" /> : <Header content="Tribes Of Rueppellii" />}
        <div className="collapse navbar-collapse right" id="navbarNav">
          <ul className="navbar-nav ml-auto w-100 justify-content-end">
            {this.props.loggedin ?
              <NavbarButtons content={['Settings', 'Logout']} clickEvent={this.handleClick} />
              :
              <NavbarButtons content={['Register', 'Login']} clickEvent={this.handleClick} />
            }
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  loggedin: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Navbar.defaultProps = {
  loggedin: false,
};

function mapStateToProps(store) {
  return {
    loggedin: store.user.isAuthenticated,
  };
}

export default withRouter(connect(
  mapStateToProps,
)(Navbar));
