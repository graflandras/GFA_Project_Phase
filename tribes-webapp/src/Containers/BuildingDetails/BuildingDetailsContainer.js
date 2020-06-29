import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBuildingById, upgradeBuilding, createTroop } from '../../actions/actions';
import './BuildingDetailsContainer.scss';
import BuildingDetails from '../../Components/BuildingDetails/BuildingDetails';

class BuildingDetailsContainer extends Component {
  state = {
    buildingId: this.props.match.params.buildingId,
  }

  componentWillMount = () => {
    this.props.getBuildingById(this.state.buildingId);
  }


  handleClick = (event) => {
    if (event.target.dataset.type === 'upgradeBuilding') {
      this.props.upgradeBuilding(this.props.building.level, this.state.buildingId);
    } else if (event.target.dataset.type === 'addTroop') {
      this.props.createTroop();
    }
  }


  render() {
    const { building } = this.props;
    return (
      <div>
        {
          building ?
            <BuildingDetails building={building} handleClick={this.handleClick} />
            : null
        }
      </div>
    );
  }
}

BuildingDetailsContainer.propTypes = {
  building: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    level: PropTypes.number,
  }).isRequired,
  getBuildingById: PropTypes.func.isRequired,
  upgradeBuilding: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      buildingId: PropTypes.number,
    }).isRequired,
  }).isRequired,
  createTroop: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getBuildingById,
  upgradeBuilding,
  createTroop,
};

const mapStateToProps = store => ({
  building: store.building.simpleBuilding,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuildingDetailsContainer));
