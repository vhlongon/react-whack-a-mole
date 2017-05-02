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
			hasEnded: false,
			timeUp: false,
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
		const [min, max] = [200 / level, 1000 / level];
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

			!this.state.timeUp && this.showMole(min, max);
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
		console.log(quantity)
		this.timeout = setTimeout(() =>
			this.onEnd(), duration * 1000
		);
		this.setState({
			timeUp: false,
			hasStarted: true,
			remainingTime: duration,
			holes: utils.generateHoles({ amount: quantity })
		});
		this.showMole(level);
		this.remainingInterval = setInterval(() => {
			this.setState({ remainingTime: this.state.remainingTime - 1 });
			(this.state.remainingTime === 0) && clearInterval(this.remainingInterval);
		}, 1000)
	}

	reset = values => {
		this.setState(prevState => ({
			score: 0,
			hasStarted: false,
			hasEnded: false,
			timeUp: true,
			remainingTime: values.duration,
			holes: prevState.holes.map(
				hole => ({ ...hole, isActive: false })
			)
		}));
		clearInterval(this.remainingInterval);
		clearTimeout(this.timeout);
	}

	onEnd = () => {
		this.timeUp = true;
		this.setState({
			hasStarted: false,
			hasEnded: true
		});
		// TODO show a time's up funny text
	}

	render() {
		const {
    	state: {
			score,
			holes,
			hasStarted,
			hasEnded,
			remainingTime,
			timeUp
			},
			start,
			reset,
			onMoleClick
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
					show={timeUp}
					text="Time's up!"
					tag="h2"
					onClick={() => this.setState({ timeUp: false })}
				/>
			</div>
		);
	}
}

export default Game;
