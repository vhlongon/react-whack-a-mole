import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Input.css';

const Input = ({className, name, children, ...props}) => {
    return (
        <div className={classnames('input', className)}>
            <label className="input__label" htmlFor={name}>{name}:</label>
            <input className="input__element" {...props} name={name} />
            {children}
        </div>
    );
};

Input.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    defaultValue: PropTypes.any,
    children: PropTypes.node
}

export default Input;