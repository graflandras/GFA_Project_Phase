import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const NavbarButtons = ({ content, clickEvent }) => (
  <div onClick={clickEvent} role="presentation">
    <Button content={content[0]} name={content[0]} />
    <Button content={content[1]} name={content[1]} />
  </div>
);

NavbarButtons.propTypes = {
  content: PropTypes.string.isRequired,
  clickEvent: PropTypes.func.isRequired,
};

export default NavbarButtons;
