import React from 'react';
import PropTypes from 'prop-types';
import ConstructionItem from './ConstructionItem';
import ProgressBar from '../ProgressBar/ProgressBar';
import ConstructionIcon from './ConstructionIcon';

const ConstructionLogger = ({
  type, level, finished, id, percentage,
}) => (
  <div className="constructionLogWrapper">
    <ConstructionIcon />
    <div className="progressWrapper">
      <ConstructionItem type={type} level={level} finished={finished} key={id} />
      <ProgressBar key={1000 + id} percentage={percentage} />
    </div>
  </div>
);

ConstructionLogger.defaultProps = {
  id: 0,
  percentage: 0,
};

ConstructionLogger.propTypes = {
  type: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  finished: PropTypes.string.isRequired,
  id: PropTypes.string,
  percentage: PropTypes.number,
};

export default ConstructionLogger;
