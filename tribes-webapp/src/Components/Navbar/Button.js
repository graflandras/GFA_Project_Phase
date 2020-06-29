import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ name, content }) => (
  <button className="nav-item nav-link" name={name}>{content}</button>
);

Button.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Button;
