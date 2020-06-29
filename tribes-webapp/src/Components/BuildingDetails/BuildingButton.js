import React from 'react';
import PropTypes from 'prop-types';
import Diamond from '../../img/icons/diamond-01.svg';
import Time from '../../img/assets/time.svg';

const BuildingButton = ({
  handleClick, iconType, buttonText, buttonStyle, buttonType,
}) => (
  <button onClick={handleClick} className={`btn buildingbtn shadow ${buttonStyle}`} data-type={`${buttonType}`}>
    <div className="image">
      <img src={iconType} alt="icon" data-type={`${buttonType}`} />
    </div>
    <div className="button-info">
      <span data-type={`${buttonType}`}>{buttonText}</span>
      <div className="button-info-details">
        <img className="textIcon" src={Diamond} alt="money" data-type={`${buttonType}`} />
        <p data-type={`${buttonType}`}> 100 </p>
        <img className="textIcon" src={Time} alt="time" data-type={`${buttonType}`} />
        <p data-type={`${buttonType}`}> 1:00 </p>
      </div>
    </div>
  </button>
);

BuildingButton.propTypes = {
  handleClick: PropTypes.func,
  iconType: PropTypes.string,
  buttonText: PropTypes.string,
  buttonStyle: PropTypes.string,
  buttonType: PropTypes.string,
};

BuildingButton.defaultProps = {
  handleClick: null,
  iconType: null,
  buttonText: null,
  buttonStyle: null,
  buttonType: null,
};

export default BuildingButton;
