import React from 'react';
import PropTypes from 'prop-types';

const ConstructionReady = ({ finished, type }) => (
  <div className="progContainer">
    <div className="progDesc">
      <h3>
        My Kingdom
      </h3>
      <p>
        {' '}
        End:
        {finished}
      </p>
    </div>
    <div className="readyCon">
      <p>
        You have a new
        {' '}
        {!type ? 'troop' : type}
      </p>
    </div>
  </div>
);


ConstructionReady.propTypes = {
  finished: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ConstructionReady;
