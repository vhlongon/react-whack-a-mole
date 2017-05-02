import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Button.css';

const Button = ({ onClick, className, text, type }) => {
  const classes = classnames(className, 'btn');
  return (
    <button className={classes} onClick={onClick} type={type}> 
      {text}
    </button>
  );
};

Button.defaultProps = {
  type: 'button'
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Button;
