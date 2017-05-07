import React from 'react';
import PropTypes from 'prop-types';
import './HighscoreItem.css';

const HighscoreItem = ({ level, scores }) => {
    return (
        <div className="highscore">
            <h3 className="highscore__label">{level}:</h3>
            <ol className="highscore__list">
                { 
                    scores.map((score, index) => 
                        <li key={index} className="highscore__item"><b>{score}</b></li>
                    ) 
                }
            </ol>
        </div>
    );
};

HighscoreItem.prototypes = {
    level: PropTypes.string.isRequire,
    scores: PropTypes.array.isRequired
}

export default HighscoreItem;