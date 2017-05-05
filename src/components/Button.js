import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Button.css';

const Button = ({ className, text, disabled, ...props }) => {
  const classes = classnames(className, 'btn', {'is-disabled': disabled});
  return (
    <button className={classes} {...props } disabled={disabled}> 
      {text}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  disabled: false
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Button;
