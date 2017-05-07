import React from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import './Score.css';

const Score = ({ score, title }) => (
  <div className="score">

    <h1 className="score__title">
      <Logo className="score__logo" height={100} />
      <span className="score__text">{title}</span>
      <span className="score__number">{score}</span>
    </h1>
  </div>
);

Score.defaultProps = {
  score: 0,
  title: 'The game Title'
}

Score.propTypes = {
  score: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}

export default Score;
