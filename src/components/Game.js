import React, { Component } from 'react';
import ScoreBoard from './Scoreboard';
import HolesList from './HolesList';
import Logo from './Logo';
import TopBar from './TopBar';
import * as utils from '../utils';
import './Game.css';


class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      // TODO: get those values from a form instead
      duration: 10, // seconds
      minSpeed: 200,
      maxSpeed: 1000,
      holes: utils.generateHoles({ amount: 6 })
    }

    // flags used for showing random holes logic, but we don't want those
    // as state since we no re-render is necessary when these change
    this.lastHole = null;
    this.timeUp = false;
  }

  reset = e => {
    this.setState(prevState => ({
      holes: prevState.holes.map(
        hole => ({ ...hole, isActive: false })
      ),
      score: 0
    }));
    this.timeUp = false;
  }

  getRandomHole = () => {
    const { holes } = this.state;
    const currentHole = holes[utils.generateRandomIndex(holes)];

    if (currentHole === this.lastHole) {
      return this.getRandomHole(holes);
    }
    this.lastHole = currentHole;
    return currentHole;
  }

  showMole = () => {
    const { minSpeed, maxSpeed } = this.state;
    const time = utils.generateRandomTime(minSpeed, maxSpeed);
    const { id: randomId } = this.getRandomHole();

    this.setState(prevState => ({
      holes: prevState.holes.map(hole =>
        hole.id === randomId ? { ...hole, isActive: true } : hole
      )
    }));

    setTimeout(() => {
      this.setState(prevState => ({
        holes: prevState.holes.map(hole =>
          hole.id === randomId ? { ...hole, isActive: false } : hole
        )
      }));

      !this.timeUp && this.showMole();
    }, time);
  }

  start = e => {
    const { duration } = this.state;

    this.reset();
    this.showMole();
    setTimeout(() =>
      this.timeUp = true, duration * 1000
    );
  }

  onMoleClick = id => {
    this.setState(prevState => ({
      holes: prevState.holes.map(hole =>
        hole.id === id ? { ...hole, isActive: false } : hole
      ),
      score: prevState.score + 1
    }));
  }

  render() {
    const {
      state: {
        score,
      holes
      },
      start,
      reset,
      onMoleClick
   } = this;

    return (
      <div className="game">
        <TopBar
          onStart={start}
          onReset={reset}
        />
        <Logo height={100} />
        <ScoreBoard title="(Re)Whack-a-mole!" score={score} />
        <HolesList items={holes} onMoleClick={onMoleClick} />
      </div>
    );
  }
}

export default Game;
