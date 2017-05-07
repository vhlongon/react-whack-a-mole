import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Select.css';

class Select extends Component {

    constructor(props) {
        super(props);
        this.state = { value: props.defaultValue}
    }
    static propTypes = {
        onChange: PropTypes.func,
        name: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        options: PropTypes.array.isRequired,
        className: PropTypes.string,
        defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    };

    handleChange = ({target: {value}}) => {
        this.setState({value});
    }

    shouldComponentUpdate = () => false
    

    render() {
        const {
            children,
            name,
            disabled,
            className,
            options
        } = this.props;
        return (
            <div className={classnames('select', className, { 'is-disabled': disabled })}>
                <label className="select__label" htmlFor={name}>{name}:</label>
                <select className="select__element"
                    name={name}
                    disabled={disabled}
                    onChange={this.handleChange}
                    defaultValue={this.state.value}
                >
                    {options.map(({ label, value }) => <option key={label} value={value}>{label}</option>)}
                </select>
                {children}
            </div>
        );
    }
}

export default Select;