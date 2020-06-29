import React, { Component } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './battle.scss';
import { getTakenCountries, getMyCountry, attackEnemy, clearAttackStatus } from '../../actions/actions';
import Loading from '../../Components/Loading/Loading';
import Popover from '../../Components/Popover/Popover'

class Battlemap extends Component {
  componentDidMount = () => {
    this.props.getMyCountry();
    this.props.getTakenCountries();
  }

  state = {
    anchorEl: null,
    pop_open: false,
    currentContent: {
      name: null,
      population: null,
      kingdomId: null,
    },
    canAttack: false,
  };

  handleClick = (geography, evt) => {
    console.log(this.props.fullMap)
    if (evt.target.classList.contains('battle-free-country')) {
      this.setState({
        anchorEl: evt.currentTarget,
        pop_open: !this.state.pop_open,
        currentContent: {
          name: geography.properties.NAME,
          population: Math.floor(geography.properties.POP_EST / 10000)
        },
        canAttack: true,
      });
    } else if (evt.target.classList.contains('battle-taken-country')) {
      const filteredCountry = this.props.fullMap.filter(item => item.location.includes(geography.properties.ISO_A3))[0]
      this.setState({
        anchorEl: evt.currentTarget,
        pop_open: !this.state.pop_open,
        currentContent: {
          name: filteredCountry.kindom_name,
          population: filteredCountry.population,
          kingdomId: filteredCountry.kingdom_id,
        },
        canAttack: true,
      });
    } else {
      const filteredCountry = this.props.fullMap.filter(item => item.location.includes(geography.properties.ISO_A3))[0]
      this.setState({
        anchorEl: evt.currentTarget,
        pop_open: !this.state.pop_open,
        currentContent: {
          name: filteredCountry.kindom_name,
          population: filteredCountry.population,
        },
        canAttack: false,
      });
    }
  };

  handleClose = () => {
    this.setState({
      pop_open: false,
      anchorEl: null,
      currentContent: null,
      kingdomId: null,
      canAttack: false,
    });
    this.props.clearAttackStatus();
  };

  handleAttack = () => {
    this.props.attackEnemy(this.state.currentContent.kingdomId);
  }

  render = () => (
    (!this.props.myCountries && !this.props.takenCountries) ?
      (<Loading />)
      :
      (<div className="mainBattleContainer">
        {this.state.currentContent ?
          <Popover
            open={this.state.pop_open}
            anchorEl={this.state.anchorEl}
            onClose={this.handleClose}
            textContent={this.state.currentContent}
            canAttack={this.state.canAttack}
            handleAttack={this.handleAttack}
            attackEnemyResult={this.props.attackEnemyResult}
          /> : null}
        <ComposableMap
          projectionConfig={{
            scale: 160,
            rotation: [-11, 0, 0],
          }}
          width={980}
          height={551}
          style={{
            width: '100%',
            height: 'auto',
          }}
        >
          <ZoomableGroup center={[0, 10]} disablePanning>
            <Geographies geography="/world-50m.json">
              {(geographies, projection) => geographies.map((geography) => {
                if ((this.props.takenCountries.filter(f => !this.props.myCountries.includes(f))).includes(geography.properties.ISO_A3)) {
                  return (
                    <Geography
                      className="battle-taken-country"
                      key={0 + geography.properties.ISO_A3}
                      geography={geography}
                      projection={projection}
                      onClick={this.handleClick}
                    />);
                } else if (this.props.myCountries.includes(geography.properties.ISO_A3)) {
                  return (
                    <Geography
                      className="battle-my-country"
                      key={1 + geography.properties.ISO_A3}
                      geography={geography}
                      projection={projection}
                      onClick={this.handleClick}
                    />);
                }
                return (
                  <Geography
                    key={2 + geography.properties.ISO_A3}
                    className="battle-free-country"
                    onClick={this.handleClick}
                    geography={geography}
                    projection={projection}
                  />);
              })}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>)
  )
}


Battlemap.propTypes = {
  myCountries: PropTypes.arrayOf(PropTypes.string),
  getMyCountry: PropTypes.func.isRequired,
  getTakenCountries: PropTypes.func.isRequired,
  takenCountries: PropTypes.arrayOf(PropTypes.string).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Battlemap.defaultProps = {
  myCountries: null,
};


const mapStateToProps = store => ({
  takenCountries: store.user.takenCountries,
  currentKingdom: store.user.currentKingdom,
  myCountries: store.user.myCountries,
  fullMap: store.user.fullMap,
  attackEnemyResult: store.user.attackEnemyResult
});

const mapDispatchToProps = {
  getTakenCountries,
  getMyCountry,
  attackEnemy,
  clearAttackStatus,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Battlemap);
