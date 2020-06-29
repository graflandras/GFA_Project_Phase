import React from 'react';
import PropTypes from 'prop-types';
import ConstructionIcon from './ConstructionIcon';
import ConstructionReady from './ConstructionReady';

const ConstructionBackLogger = ({ finished, type, id }) => (
  <div className="constructionLogWrapper">
    <ConstructionIcon />
    <div className="progressWrapper">
      <ConstructionReady finished={finished} type={type} key={id} />
    </div>
  </div>
);

ConstructionBackLogger.defaultProps = {
  id: 0,
};

ConstructionBackLogger.propTypes = {
  type: PropTypes.string.isRequired,
  finished: PropTypes.string.isRequired,
  id: PropTypes.string,
};

export default ConstructionBackLogger;
