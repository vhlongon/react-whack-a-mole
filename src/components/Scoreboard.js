import React from 'react';
import PropTypes from 'prop-types';
import './Scoreboard.css';

const ScoreBoard = ({score, title}) => (
  <div className="scoreboard">
    <h1 className="scoreboard__title">
      {title} <span className="scoreboard__score">{score}</span>
    </h1>
  </div>
);

ScoreBoard.defaultProps = {
  score: 0,
  title:  'The game Title'
}

ScoreBoard.propTypes = {
  score: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}

export default ScoreBoard;
