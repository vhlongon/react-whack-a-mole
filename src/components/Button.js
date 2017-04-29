import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Button.css';

const Button = ({ onClick, className, text }) => {
  const classes = classnames(className, 'btn');
  return (
    <button className={classes} onClick={onClick}> 
      {text}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  text: PropTypes.string.isRequired
};

export default Button;
