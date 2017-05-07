import React, { Component } from 'react';
import Hole from './Hole';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './HolesList.css';
import { isEqual } from 'lodash';


class HolesList extends Component {

  constructor(props) {
    super(props);
    this.state = { isPressed: false }
  }
  
  static defaultProps = {
    holes: []
  }

  static propTypes = {
    holes: PropTypes.array.isRequired,
    onMoleClick: PropTypes.func.isRequired
  }

  shouldComponentUpdate = (nextProps, nextState) => 
    !(isEqual(nextProps.holes, this.props.holes)) || nextState.isPressed !== this.state.isPressed;
  
  

  onMouseDown = e => {
    this.setState({ isPressed: true });
  }

  onMouseUp = e => {
    this.setState({ isPressed: false });
  }

  render() {
    const { holes, onMoleClick } = this.props;
    return (
      <div
        className={classnames('holes-list', { 'is-pressed': this.state.isPressed })}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      >
        {
          holes.map(({ isActive, id }) =>
            <Hole
              key={id}
              id={id}
              isActive={isActive}
              onClick={onMoleClick}
            />
          )
        }
      </div>
    );
  }
}

export default HolesList;
