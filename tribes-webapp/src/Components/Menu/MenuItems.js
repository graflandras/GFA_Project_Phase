import React from 'react';
import PropTypes from 'prop-types';

const MenuItem = ({ label, imgsrc, dataname }) => (
  <div className="itemContainer" data-name={dataname}>
    <div className="iconContainer" >
      <img src={imgsrc} data-name={dataname} alt="" />
    </div>
    <div className="textContainer">
      <p data-name={dataname}>
        {label}
      </p>
    </div>
  </div>
);

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  imgsrc: PropTypes.node.isRequired,
  dataname: PropTypes.string.isRequired,
};

export default MenuItem;
