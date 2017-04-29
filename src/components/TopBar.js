import React from 'react';
import Button from './Button';
import './TopBar.css';

const TopBar = ({ onStart, onReset }) => (
    <div className="topbar">
        <Button
            className="topbar__btn"
            onClick={onStart}
            text="Start game"
        />
        <Button
            className="topbar__btn"
            onClick={onReset}
            text="Reset game"
        />
    </div>
);

export default TopBar;