import React from 'react';
import PropTypes from 'prop-types';
import ProgressFiller from './ProgressFiller';

const ProgressBar = ({ percentage }) => (
  <div className="progressBar">
    <ProgressFiller percentage={percentage} />
  </div>
);

ProgressBar.defaultProps = {
  percentage: 0,
};

ProgressBar.propTypes = {
  percentage: PropTypes.number,
};

export default ProgressBar;
