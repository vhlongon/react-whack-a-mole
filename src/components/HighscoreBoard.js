import React from 'react';
import HighscoreItem from './HighscoreItem';
import PropTypes from 'prop-types';
import './HighscoreBoard.css';

const getLevelName = level => {
    switch(level) {
        case '1': {
            return 'Easy';
        }
        case '2': {
            return 'Normal';
        }
        case '3': {
            return 'Hard';
        }
        default: {
            return '--'
        }
    }
};

const HighscoreBoard = ({scores}) => {
    const data = Object.entries(scores);
    return (
        <div className="highscore-board">
            <h2 className="highscore-board__title">Highscores:</h2>
            { 
                data.map(([level, scores], index) => <HighscoreItem key={index} level={getLevelName(level)} scores={scores} />)
            }
        </div>
    );
};

HighscoreBoard.propTypes = {
    scores: PropTypes.object.isRequired
};

export default HighscoreBoard;