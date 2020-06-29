import React from 'react';
import PropTypes from 'prop-types';

const ConstructionItem = ({ type, level, finished }) => (
  <div className="progContainer">
    <div className="progDesc">
      <h3>
        Building
        {' '}
        {type}
        {' '}
        Level
        {level}
      </h3>
      <p>
        {' '}
        End:
        {finished}
      </p>
      <p className="progTimer" />
    </div>
  </div>
);

ConstructionItem.propTypes = {
  type: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  finished: PropTypes.string.isRequired,
};

export default ConstructionItem;
