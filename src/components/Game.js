import React, { Component } from 'react';
import ScoreBoard from './Scoreboard';
import HolesList from './HolesList';
import Logo from './Logo';
import Controls from './Controls';
import Counter from './Counter';
import TimeUp from './TimeUp';
import * as utils from '../utils';
import './Game.css';


class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasStarted: false,
			isTimeUp: false,
			score: 0,
			remainingTime: 0,
			holes: []
		}

		// flags used for showing random holes logic, but we don't want those
		// as state since we no re-render is necessary when these change
		this.lastHole = null;
		this.timeout = null;
		this.remainingInterval = null;
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

	showMole = level => {
		const [min, max] = [(300 / level), (1500 / level)];
		const time = utils.generateRandomTime(min, max);
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

			!this.state.isTimeUp && this.showMole(min, max);
		}, time);

	}

	onMoleClick = id => {
		this.setState(prevState => ({
			holes: prevState.holes.map(hole =>
				hole.id === id ? { ...hole, isActive: false } : hole
			),
			score: prevState.score + 1
		}));
	}

	start = ({ duration, level, quantity }) => {
		this.timeout = setTimeout(() =>
			this.onEnd(), duration * 1000
		);
		this.setState(prevState => ({
			isTimeUp: false,
			hasStarted: true,
			remainingTime: duration,
			holes: utils.generateHoles({ amount: quantity })
		}), () => this.showMole(level));

		this.remainingInterval = setInterval(() => {
			this.setState({ remainingTime: this.state.remainingTime - 1 });
			(this.state.remainingTime === 0) && clearInterval(this.remainingInterval);
		}, 1000)
	}

	reset = values => {
		this.setState(prevState => ({
			score: 0,
			hasStarted: false,
			isTimeUp: true,
			remainingTime: values.duration,
			holes: prevState.holes.map(
				hole => ({ ...hole, isActive: false })
			)
		}));
		clearInterval(this.remainingInterval);
		clearTimeout(this.timeout);
	}

	onEnd = () => {
		this.setState({
      score: 0,
			hasStarted: false,
      isTimeUp: true
		});
	}

  closeTimeUp = () => {
    this.setState({isTimeUp: false});
  }


	render() {
		const {
    	state: {
			score,
			holes,
			hasStarted,
			remainingTime,
			isTimeUp
			},
			start,
			reset,
			onMoleClick,
      closeTimeUp
			} = this;
		return (
			<div className="game">
				<Controls
					onStart={start}
					onReset={reset}
				/>
				<Logo height={100} />
				<ScoreBoard
					title="(Re)Whack-a-mole!"
					score={score}
				/>
				<Counter
					className="game__counter"
					isVisible={hasStarted}
					time={remainingTime}
				/>
				<HolesList
					items={holes}
					onMoleClick={onMoleClick}
				/>
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
