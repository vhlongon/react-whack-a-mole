import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './Counter.css';

const Counter = ({ className, isVisible, time }) => (
    <div className={classnames('counter', className)}>
        {isVisible && `Remaining: ${time}s`}
    </div>
);

Counter.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired,
  className: PropTypes.string
};

export default Counter;
