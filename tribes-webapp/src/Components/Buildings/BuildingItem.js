import React from 'react';
import PropTypes from 'prop-types';

const BuildingItem = ({
  label, level, imgsrc, dataname, onClick, buildingData,
}) => (
  <div className="buildingItemContainer" data-name={dataname} onClick={onClick} role="presentation" >
    <div className="buildingIconContainer" data-name={dataname} onClick={buildingData} role="presentation" >
      <img src={imgsrc} data-name={dataname} alt="" />
    </div>
    <div className="textContainer">
      <p data-name={dataname}>
        {label}
      </p>
      <p data-name={dataname}>
        {level}
      </p>
    </div>
  </div>
);

BuildingItem.propTypes = {
  label: PropTypes.string.isRequired,
  level: PropTypes.string,
  imgsrc: PropTypes.node.isRequired,
  dataname: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  buildingData: PropTypes.func,
};

BuildingItem.defaultProps = {
  level: '',
  buildingData: null,
  onClick: null,
};

export default BuildingItem;
