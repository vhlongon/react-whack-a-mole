import React, { Component } from 'react';
import Button from './Button';
import Input from './Input';
import './Controls.css';

class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 1,
            duration: 10,
            quantity: 6,
        }
    }

    onChange = ({ target: { name, value } }) =>
        this.setState({ [name]: parseInt(value, 10) });

    handleSubmit = e => {
        e.preventDefault();
        this.props.onStart(this.state)
    }

    handleReset = e => {
        this.setState(prevState => ({
            level: 1,
            duration: 10,
            quantity: 6
        }), () => this.props.onReset(this.state));
    }

    render() {
        const {
            handleSubmit,
            handleReset,
            onChange,
            state: {
                level,
                duration,
                quantity
            }
        } = this;

        
        return (
            <form className="controls" onChange={onChange}>
                <div className="input input--select">
                    <label htmlFor="level">Level:  </label>
                    <select className="input__element input__element--select" name="level" defaultValue={level}>
                        <option value="1">Easy</option>
                        <option value="2">Normal</option>
                        <option value="3">Hard</option>
                    </select>
                </div>
                <Input
                    className="controls__input"
                    type="number"
                    name="duration"
                    id="duration"
                    defaultValue={duration}
                />
                <Input
                    className="controls__input"
                    type="number"
                    name="quantity"
                    id="quantity"
                    defaultValue={quantity}
                />
                <Button
                    className="controls__input"
                    type="submit"
                    onClick={handleSubmit}
                    text="Start game"
                />
                <Button
                    className="controls__input"
                    type="reset"
                    onClick={handleReset}
                    text="Reset game"
                />
            </form>
        );
    }
}

export default Controls;