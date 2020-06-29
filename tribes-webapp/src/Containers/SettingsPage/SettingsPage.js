import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateKingdomName } from '../../actions/actions';
import Navbar from '../../Components/Navbar/Navbar';
import InputField from '../../Components/InputField/InputField';
import './settings.scss';
import Title from '../../Components/Title';

export class Settings extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const { newKingdomName } = event.target.elements;
    this.props.updateKingdomName(newKingdomName.value);
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="settings-title">Settings</div>
          <form className="settings-form" onSubmit={this.handleSubmit}>
            <Title className="settings-header" content="Kingdom Settings" />
            <InputField type="text" id="newKingdomName" placeholder="Kingdom's name" requiredField />
            {this.props.shouldUpdate ?
              <div className="text-danger center">Your new kingdom name is:
                {' '}
                <strong>{this.props.newKingdomNameResult}</strong>
              </div> : null
            }
            <div className="settings">
              <input type="submit" value="Update Settings" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    newKingdomNameResult: store.kingdom.name,
    shouldUpdate: store.kingdom.shouldUpdate,
  };
}

const mapDispatchToProps = {
  updateKingdomName,
};

Settings.defaultProps = {
  newKingdomNameResult: null,
  shouldUpdate: false,
};

Settings.propTypes = {
  newKingdomNameResult: PropTypes.string,
  shouldUpdate: PropTypes.bool,
  updateKingdomName: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
