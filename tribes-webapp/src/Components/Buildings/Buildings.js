import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Building from './Building';
import BuildingItem from './BuildingItem';
import FarmIcon from '../../img/assets/addfactory.svg';
import MineIcon from '../../img/assets/addmine.svg';
import AcademyIcon from '../../img/assets/addacademy.svg';
import './building.scss';
import { getBuildings, sendBuilding } from '../../actions/actions';
import Loading from '../../Components/Loading/Loading';


class Buildings extends Component {
  componentDidMount = () => {
    this.props.getBuildings();
  }

  buildingDataHandleClick = (e) => {
    const { dataset } = e.currentTarget;
    this.props.history.push(`/kingdom/buildings/${dataset.name}`);
  }

  sendNewBuilding = (e) => {
    const { dataset } = e.currentTarget;
    this.props.sendBuilding(dataset.name);
  }

  render = () => (
    !this.props.finishedBuildings ? <Loading /> :
    <div className="mainBuildingContainer">
      <div className="buildingContainer" role="presentation">
        {this.props.finishedBuildings.map(item =>
          (<Building
            key={item._id}
            onClick={this.buildingDataHandleClick}
            building={item}
          />))}
      </div>
      <div className="buildingContainer2" role="presentation">
        <BuildingItem label="Add Farm" key="farm" imgsrc={FarmIcon} onClick={this.sendNewBuilding} dataname="farm" />
        <BuildingItem label="Add Mine" key="mine" imgsrc={MineIcon} onClick={this.sendNewBuilding} dataname="mine" />
        <BuildingItem label="Add Academy" key="academy" imgsrc={AcademyIcon} onClick={this.sendNewBuilding} dataname="academy" />
      </div>
    </div>
  )
}

Buildings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  getBuildings: PropTypes.func.isRequired,
  building: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    level: PropTypes.number,
  }).isRequired,
  sendBuilding: PropTypes.func.isRequired,
  finishedBuildings: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    level: PropTypes.number,
  }),
};

Buildings.defaultProps = {
  finishedBuildings: null,
};

const mapDispatchToProps = {
  getBuildings,
  sendBuilding,
};

const mapStateToProps = store => ({
  isGame: store.user.isGame,
  finishedBuildings: store.building.finishedBuildings,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Buildings));
