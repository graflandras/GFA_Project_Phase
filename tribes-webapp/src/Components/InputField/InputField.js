import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({
  type, id, placeholder, handleChange, requiredField,
}) => (
  <div className="input-container">
    <input className="input-field" type={type} name={id} placeholder={placeholder} onChange={handleChange} required={requiredField} />
  </div>
);

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  requiredField: PropTypes.bool,
};

InputField.defaultProps = {
  handleChange: () => { },
  requiredField: false,
};

export default InputField;
