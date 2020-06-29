import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ className, content }) => (
  <div className={className}>
    <h1>
      {content}
    </h1>
  </div>
);

Title.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
};

Title.defaultProps = {
  className: '',
  content: '',
};

export default Title;
