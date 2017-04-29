import React, { Component } from 'react';
import ScoreBoard from './Scoreboard';
import HolesList from './HolesList';
import TopBar from './TopBar';
import * as utils from '../utils';
import './Game.css';


class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      duration: 10, // seconds
      minSpeed: 200,
      maxSpeed: 1000,
      lastHole: null,
      timeUp: false,
      holes: utils.generateHoles({ amount: 6, isActive: true })
    }
  }

  resetGame = e => {
    this.setState(prevState => ({
      score: 0,
      timeUp: false,
      holes: prevState.holes.map(hole => ({...hole, isActive: false}))
    }));
  }

  showMole = ({ min, max }) => {
    //TODO
  }

  startGame = e => {
    const { minSpeed, maxSpeed, duration } = this.state;
    this.showMole({ minSpeed, maxSpeed });
    setTimeout(
      () => this.setState({ timeUp: true }),
      duration * 1000)
  }

  onMoleClick = id => {
    this.setState(prevState =>
      ({
        holes: prevState.holes.map(hole => {
          if (hole.id === id) {
            return { ...hole, isActive: false }
          } else {
            return hole
          }
        }),
        score: prevState.score + 1
      }));
  }

  render() {
    const {
      state: {
        score,
        holes
      },
      startGame,
      resetGame,
      onMoleClick
   } = this;

    return (
      <div className="game">
        <TopBar
          onStart={startGame}
          onReset={resetGame}
        />
        <ScoreBoard title="Whack-a-mole!" score={score} />
        <HolesList items={holes} onMoleClick={onMoleClick} />
      </div>
    );
  }
}

export default Game;
