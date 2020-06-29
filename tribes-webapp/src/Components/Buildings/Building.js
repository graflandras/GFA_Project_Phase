import React from 'react';
import PropTypes from 'prop-types';

const Building = ({
  building, onClick,
}) => (
  <div className="buildingItemContainer" data-name={building._id} onClick={onClick} role="presentation">
    <div className="buildingIconContainer" role="presentation">
      <img src={`../../img/assets/${building.type}.svg`} alt={`${building.type}`} />
    </div>
    <div className="textContainer">
      <p>
        {building.type}
      </p>
      <p>
        {`Level ${building.level}`}
      </p>
    </div>
  </div>
);

Building.propTypes = {
  building: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    level: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
};

Building.defaultProps = {
  onClick: null,
};

export default Building;
