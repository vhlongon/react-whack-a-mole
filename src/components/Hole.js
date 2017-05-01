import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mole from '../images/mole.svg';
import classnames from 'classnames';
import './Hole.css';


class Hole extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
  }
 
  handleClick = e => {
    // if the click is not from an actual user click return, no cheating!
    if (!e.isTrusted) return;
    const { onMoleClick, id } = this.props;
    onMoleClick(id);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.isActive !== this.props.isActive;
  }

  render() {
    const { id, isActive } = this.props;
    const classes = classnames('hole', `hole${id}`, { 'up': isActive });
    return (
      <div className={classes}>
        <div
          className="hole__mole"
          style={{ backgroundImage: `url(${mole})` }}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default Hole;