import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Logo.css';

const Logo = ({ height, color, className }) => (
    <svg
        className={classnames('logo', className)}
        width={`${height * 11.11}px`} height={`${height}px`}
        viewBox="0 0 3925 3525" version="1.1" xmlns="http://www.w3.org/2000/svg"
    >
        <circle stroke="none" fill={`${color}`} cx="1960" cy="1760" r="355"></circle>
        <g stroke={`${color}`} strokeWidth="170" fill="none">
            <ellipse cx="2575" cy="545" rx="715" ry="1875" transform="rotate(30)"></ellipse>
            <ellipse cx="1760" cy="-1960" rx="715" ry="1875" transform="rotate(90)"></ellipse>
            <ellipse cx="-815" cy="-2505" rx="715" ry="1875" transform="rotate(-210)"></ellipse>
        </g>
    </svg>
);

Logo.defaultProps = {
    color: '#67DAF9',
    height: 392.5
};

Logo.propTypes = {
    color: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    className: PropTypes.string,
};

export default Logo;