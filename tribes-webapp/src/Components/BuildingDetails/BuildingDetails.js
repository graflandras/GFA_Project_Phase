import React from 'react';
import PropTypes from 'prop-types';
import './BuildingDetails.scss';
import Building from '../Buildings/Building';
import Attack from '../../img/icons/attack_button-01.svg';
import Food from '../../img/icons/food-01.svg';
import BuildingButton from './BuildingButton';
import conIcon from '../../img/assets/history.svg';
import troopIcon from '../../img/assets/troops.svg';


const BuildingDetails = ({ building, handleClick }) => (
  <div className="mainBuildingContainer">
    <div className="mainBuildingDetailsContainer">
      <div className="buildingId" alt="building-data">
        <Building building={building} />
      </div >
      <div className="buildingUpdateInfoContainer">
        <div className="instructions">
          <p>
            You can create Troops in your
            {building.name} The higher level your
            {building.name} is, the stronger your troops are.
          </p>
          <p>
            Every level increases 1
            <img className="textIcon" src={Attack} alt="attack" />
            of the Troops.
          </p>
          <p>
            Every Troop eats 1
            <img className="textIcon" src={Food} alt="food" />
            every minute.
          </p>
        </div>
        <div className="buttons">
          {building.type === 'academy' ?
            <div className="academy-buttons">
              <BuildingButton
                handleClick={handleClick}
                iconType={troopIcon}
                buttonText={`create troop level 1`}
                buttonStyle="btn-success"
                buttonType="addTroop"
              />
              <BuildingButton
                handleClick={handleClick}
                iconType={conIcon}
                buttonText={`upgrade to level ${building.level + 1}`}
                buttonStyle="btn-primary"
                buttonType="upgradeBuilding"
              />
            </div>
            :
            <div className="academy-buttons">
              <BuildingButton
                handleClick={handleClick}
                iconType={conIcon}
                buttonText={`upgrade to level ${building.level + 1}`}
                buttonStyle="btn-primary"
                buttonType="upgradeBuilding"
              />
            </div>
          }
        </div>
      </div>
    </div>
  </div>
);

BuildingDetails.propTypes = {
  handleClick: PropTypes.func,
  building: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    level: PropTypes.number,
  }).isRequired,
};

BuildingDetails.defaultProps = {
  handleClick: null,
};

export default BuildingDetails;
