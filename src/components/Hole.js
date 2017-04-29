import React from 'react';
import PropTypes from 'prop-types';
import Mole from './Mole';
import classnames from 'classnames';
import './Hole.css';

const Hole = ({ id, isActive }) => {
  const classes = classnames('hole', `hole${id}`, { 'up': isActive });
  return (
    <div className={classes}>
      <Mole
        className="hole__mole"
        onClick={e => console.log(e.target)}
      />
    </div>
  );
};

Hole.propTypes = {
  id: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
};

export default Hole;