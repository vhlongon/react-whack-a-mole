import React, { Component } from 'react';
import ScoreBoard from './Scoreboard';
import HolesList from './HolesList';
import Button from './Button';
import './Game.css';

const holes = [
  {isActive: false},
  {isActive: false},
  {isActive: false},
  {isActive: false},
  {isActive: true},
  {isActive: false}
];

class Game extends Component {
  render() {
    return (
      <div className="game">
          <Button 
            className="game__btn" 
            onClick={e => console.log('start game!')} 
            text="Start game"
          />
          <ScoreBoard  title="Whack-a-mole!" />
          <HolesList items={holes} />
      </div>
    );
  }
}

export default Game;
