import React from 'react';
import PropTypes from 'prop-types';
import mole from '../images/mole.svg';
import classnames from 'classnames';
import './Mole.css';

const Mole = ({ onClick, className }) => {
  const classes = classnames(className, 'mole');
  return (
    <div
      className={classes}
      style={{ backgroundImage: `url(${mole})` }}
      onClick={onClick}
    />
  );
};

Mole.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default Mole;
