import React, { Component } from 'react';
import ScoreBoard from './Scoreboard';
import HolesList from './HolesList';
import Logo from './Logo';
import TopBar from './TopBar';
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
			score: 0,
			// TODO: get those values from a form instead
			duration: 10, // seconds
			// initally set to the same as duration
			remainingTime: 10,
			minSpeed: 200,
			maxSpeed: 1000,
			holes: utils.generateHoles({ amount: 6 })
		}

		// flags used for showing random holes logic, but we don't want those
		// as state since we no re-render is necessary when these change
		this.lastHole = null;
		this.timeUp = false;
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

	onMoleClick = id => {
		this.setState(prevState => ({
			holes: prevState.holes.map(hole =>
				hole.id === id ? { ...hole, isActive: false } : hole
			),
			score: prevState.score + 1
		}));
	}

	start = e => {
		this.remainingTime = this.state.duration;
		this.reset();
		this.timeUp = false;
		this.showMole();
		this.timeout = setTimeout(() =>
			this.onEnd(), this.state.duration * 1000
		);
		this.setState({ hasStarted: true });
		this.remainingInterval = setInterval(() => {
			this.setState({ remainingTime: this.state.remainingTime - 1 });
			(this.state.remainingTime === 0) && clearInterval(this.remainingInterval);
		}, 1000)
	}

	reset = e => {
		this.setState(prevState => ({
			holes: prevState.holes.map(
				hole => ({ ...hole, isActive: false })
			),
			score: 0,
			hasStarted: false,
			hasEnded: false,
			remainingTime: this.state.duration
		}));
		this.timeUp = true;
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
				remainingTime
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
					show={hasEnded} 
					text="Time's up!" 
					tag="h2"
					onClick={() => reset()} 
				/>
			</div>
		);
	}
}

export default Game;
