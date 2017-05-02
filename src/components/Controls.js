import React, { Component } from 'react';
import Button from './Button';

class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 1,
            duration: 10,
            quantity: 6,
        }
    }

    onChange = ({target: { name, value }}) =>
        this.setState({ [name]: parseInt(value) });

    handleSubmit = e => {
        e.preventDefault();
        this.props.onStart(this.state)
    }

    handleReset = e => {
        this.setState({
            level: 1,
            duration: 10
        });
        this.props.onReset(this.state);
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
            <form onChange={onChange}>
                <select name="level" id="level" defaultValue={level}>
                    <option value="1">Easy</option>
                    <option value="2">Normal</option>
                    <option value="3">Hard</option>
                </select>
                <input 
                    type="number" 
                    name="duration" 
                    id="duration" 
                    defaultValue={duration} 
                />
                <input 
                    type="number" 
                    name="quantity" 
                    id="quantity" 
                    defaultValue={quantity} 
                />
                <Button
                    className="topbar__btn"
                    type="submit"
                    onClick={handleSubmit}
                    text="Start game"
                />
                <Button
                    className="topbar__btn"
                    type="reset"
                    onClick={handleReset}
                    text="Reset game"
                />
            </form>
        );
    }
}

export default Controls;