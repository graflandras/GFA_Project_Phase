import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ content }) => (
  <span className="navbar-brand">
    <p>
      {content}
    </p>
  </span>
);

Header.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Header;

