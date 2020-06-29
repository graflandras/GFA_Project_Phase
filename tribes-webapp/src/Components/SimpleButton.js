import React from 'react';
import PropTypes from 'prop-types';

const SimpleButton = ({ name, onClick, content }) => (
  <button className="simplebutton" name={name} onClick={onClick}>{content}</button>
);

SimpleButton.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  content: PropTypes.string.isRequired,
};

SimpleButton.defaultProps = {
  onClick: () => { },
};

export default SimpleButton;
