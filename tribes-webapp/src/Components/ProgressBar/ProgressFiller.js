import React from 'react';
import PropTypes from 'prop-types';

const ProgressFiller = ({ percentage }) => (
  <div className="progressFiller" style={{ width: `${percentage}%` }} />
);

ProgressFiller.defaultProps = {
  percentage: 0,
};

ProgressFiller.propTypes = {
  percentage: PropTypes.number,
};

export default ProgressFiller;
