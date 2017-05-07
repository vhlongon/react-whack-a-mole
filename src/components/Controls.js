import React, { Component } from 'react';
import Button from './Button';
import Select from './Select';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import './Controls.css';

class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 1 }
    }

    static propTypes = {
        onStart: PropTypes.func.isRequired,
        onStop: PropTypes.func.isRequired
    }

    shouldComponentUpdate = (nextProps, nextState) =>
        !(isEqual(nextState, this.state)) || 
            nextProps.hasStarted !== this.props.hasStarted
    

    onChange = ({ target: { name, value } }) =>
        this.setState(prevState => ({
            ...prevState,
            [name]: parseInt(value, 10)
        }));

    handleSubmit = e => {
        e.preventDefault();
        this.props.onStart(this.state)
    }

    handleStop = e => {
        this.props.onStop(this.state);
    }
    
    render() {
        const {
            handleSubmit,
            handleStop,
            onChange,
            state: {
                level,
            },
            props: {
                hasStarted
            }
        } = this;
        const options = [
            { label: 'Easy', value: '1' },
            { label: 'Normal', value: '2' },
            { label: 'Hard', value: '3' }
        ];

        return (
            <form className="controls" onChange={onChange}>
                <Select options={options}
                    name="level"
                    disabled={hasStarted}
                    defaultValue={level}
                />
                <Button
                    className="controls__input"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={hasStarted}
                    text="Start game"
                />
                <Button
                    className="controls__input"
                    type="reset"
                    onClick={handleStop}
                    text="Stop game"
                    disabled={!hasStarted}
                />
            </form>
        );
    }
}

export default Controls;