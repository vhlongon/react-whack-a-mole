import React, { Component } from 'react';
import Score from './Score';
import HolesList from './HolesList';
import Controls from './Controls';
import Counter from './Counter';
import TimeUp from './TimeUp';
import HighscoreBoard from './HighscoreBoard';
import * as utils from '../utils';
import { isEqual, find } from 'lodash';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasStarted: false,
      isTimeUp: false,
      score: 0,
      remainingTime: 0,
      duration: 10,
      quantity: 6,
      level: null,
      highscores: utils.readFromStorage(),
      holes: []
    }

    // flags used for showing random holes logic, and storing the game
    // remaining counter and timeout, we don't want those
    // as state since no re-render is necessary when these change
    this.lastHole = null;
    this.remainingTimeout = null;
    this.remainingInterval = null;
  }

  getRandomHole = holes => {
    const currentHole = holes[utils.generateRandomIndex(holes)];

    if (currentHole === this.lastHole) {
      return this.getRandomHole(holes);
    }
    this.lastHole = currentHole;
    return currentHole;
  }

  showMole = level => {
    const [min, max] = [(300 / level), (1500 / level)];
    const time = utils.generateRandomTime(min, max);
    const { id: randomId } = this.getRandomHole(this.state.holes);

    this.setState(prevState => ({
      holes: prevState.holes.map(hole =>
        hole.id === randomId ? { ...hole, isActive: true } : hole
      )
    }));

    // we use this timeout to hide the current active mole in state
    // after the randomly generate time for it has passed
    // but first we make sure that it hasn't been clicked on yet 
    // (onMoleClick when you score a point) and its status is still active
    // otherwise we will tigger an extra / unnecessary rerender
    setTimeout(() => {
      const currentHole = find(this.state.holes, { 'id': randomId });
      if (currentHole && currentHole.isActive) {
        this.setState(prevState => ({
          holes: prevState.holes.map(hole =>
            hole.id === randomId ? { ...hole, isActive: false } : hole
          )
        }));
      }

      (!this.state.isTimeUp && this.state.holes.length) && this.showMole(min, max);
    }, time);
  }

  onMoleClick = id => {
    // besides updating the score, as make sure to set the current mole
    // active status to false to immediately hide it upon hit 
    this.setState(prevState => ({
      holes: prevState.holes.map(hole =>
        hole.id === id ? { ...hole, isActive: false } : hole
      ),
      score: prevState.score + 1
    }));
  }

  start = ({ level }) => {
    const { duration, quantity } = this.state
    // set the necessary state update once the game duration has come to on end
    this.remainingTimeout = setTimeout(() =>
      this.onEnd(), duration * 1000
    );
    // using setState callback as second parameter here to make sure
    // the holes are already in place when running showHole()
    this.setState(prevState => ({
      isTimeUp: false,
      hasStarted: true,
      remainingTime: duration,
      level,
      holes: utils.generateItems({ amount: quantity })
    }), () => this.showMole(level));
    // set the timer for the game duration so we can show the 
    // reamining time during a game session
    this.remainingInterval = setInterval(() => {
      this.setState({ remainingTime: this.state.remainingTime - 1 });
      (this.state.remainingTime === 0) && clearInterval(this.remainingInterval);
    }, 1000)
  }

  stop = () => {
    // reset the game and clear the timer and session
    this.setState(prevState => ({
      holes: [],
      score: 0,
      hasStarted: false,
      remainingTime: this.state.duration,
    }));
    clearInterval(this.remainingInterval);
    clearTimeout(this.remainingTimeout);
  }

  onEnd = () => {
    this.setState({
      hasStarted: false,
      isTimeUp: true
    });
    const { score, level } = this.state;
    if (utils.isInStorage()) {
      const stored = utils.readFromStorage();
      const currentLevel = stored[level] ? stored[level].slice(0, 2) : null;
      const newScoresData = {
        ...stored,
        [level]: currentLevel ? [...currentLevel, score].sort((a, b) => b - a) : [score]
      }
      utils.saveToStorage(newScoresData);
      this.setState({ highscores: newScoresData });
    } else {
      const scoresData = { [level]: [score] };
      utils.saveToStorage(scoresData);
      this.setState({ highscores: scoresData });
    }
  }

  closeTimeUp = () => {
    this.setState({
      score: 0,
      isTimeUp: false
    });
  }

  shouldComponentUpdate = (nextProps, nextState) =>
    !(isEqual(this.state, nextState));

  render() {
    const {
    	state: {
        score,
      holes,
      hasStarted,
      remainingTime,
      isTimeUp,
      highscores
			},
      start,
      stop,
      onMoleClick,
      closeTimeUp
			} = this;

    return (
      <div className="game">
        {highscores ?
          <HighscoreBoard scores={highscores} /> :
          <h3 className="game__no-score-text">No Scores yet...</h3>
        }
        <Controls
          onStart={start}
          onStop={stop}
          hasStarted={hasStarted}
        />
        <Score
          title="(Re)Whack-a-mole!"
          score={score}
        />
        <Counter
          className="game__counter"
          isVisible={hasStarted}
          time={remainingTime}
        />
        {
          !hasStarted && !isTimeUp ?
            <h2 className="game__placeholder-text">Choose your game!</h2> :
            <HolesList
              holes={holes}
              onMoleClick={onMoleClick}
            />
        }
        <TimeUp
          show={isTimeUp}
          text="Time's up!"
          tag="h2"
          onCloseClick={closeTimeUp}
        />
      </div>
    );
  }
}

export default Game;
