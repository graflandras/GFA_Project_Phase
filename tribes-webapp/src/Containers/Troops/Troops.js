import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import './troops.scss';
import SimpleButton from '../../Components/SimpleButton';
import { getTroops } from '../../actions/actions';

class Troops extends Component {
  componentWillMount = () => {
    this.props.getTroops();
  }

  render() {
    return (
      <div className="mainTroopsContainer">
        <div className="left">
          <div className="troopIcon">
            <img src="../../img/assets/troopbg.svg" alt="" className="troopPicture" />
          </div>
          <div className="troopText">
            <span>Attack: 35 ⚔️</span>
            <span>Defence: 35 🛡️</span>
            <span>Sustenance: 25 🥐</span>
          </div>
        </div>
        <div className="upgradeTroops">
          <SimpleButton name="" onClick="" content={`${this.props.level1} Troops level 1`} />
          <input />
          <SimpleButton name="" onClick="" content={`${this.props.level2} Troops level 2`} />
          <input />
          <SimpleButton name="" onClick="" content={`${this.props.level3} Troops level 3`} />
          <input />
        </div>
      </div>
    );
  }
}

Troops.propTypes = {
  level: PropTypes.number.isRequired,
  leve2: PropTypes.number.isRequired,
  leve3: PropTypes.number.isRequired,
  getTroops: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getTroops,
};

const mapStateToProps = store => ({
  level1: store.kingdom.level1Troops,
  level2: store.kingdom.level2Troops,
  level3: store.kingdom.level3Troops,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Troops));
