import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './notimplemented.scss';
import SimpleButton from '../../Components/SimpleButton';
import Title from '../../Components/Title';

export default class NotImplementedYet extends Component {
  handleClick = () => this.props.history.push('/login');

  render() {
    return (
      <div>
        <div className="container">
          <Title className="notimplementedyet" content="Not implemented yet, click the button to get back to the login page." />
          <div className="redirect">
            <SimpleButton name="redirect" onClick={this.handleClick} content="Redirect to login page" />
          </div>
        </div>
      </div>
    );
  }
}

NotImplementedYet.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
