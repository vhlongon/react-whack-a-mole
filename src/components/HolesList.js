import React, { Component } from 'react';
import Hole from './Hole';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './HolesList.css';



class HolesList extends Component {

  constructor(props) {
    super(props);
    this.state = { isPressed: false }
  }
  static defaultProps = {
    items: []
  }

  static propTypes = {
    items: PropTypes.array.isRequired,
    onMoleClick: PropTypes.func.isRequired
  }

  onMouseDown = e => {
    this.setState({ isPressed: true });
  }

  onMouseUp = e => {
    this.setState({ isPressed: false });
  }

  render() {
    const { items, onMoleClick } = this.props;
    return (
      <div
        className={classnames('holes-list', { 'is-pressed': this.state.isPressed })}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      >
        {
          items.map(({ isActive, id }) =>
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

// const HolesList = ({ items, onMoleClick }) => (
//   <div className="holes-list" onMouseDown={e => console.log(e)}>
//     {
//       items.map(({ isActive, id }) =>
//         <Hole
//           key={id}
//           id={id}
//           isActive={isActive}
//           onClick={onMoleClick}
//         />
//       )
//     }
//   </div>
// );

// HolesList.defaultProps = {
//   items: []
// };

// HolesList.propTypes = {
//   items: PropTypes.array.isRequired,
//   onMoleClick: PropTypes.func.isRequired
// };

// export default HolesList;
