import React from 'react';
import Hole from './Hole';
import PropTypes from 'prop-types';
import './HolesList.css';

const HolesList = ({ items, onMoleClick }) => (
  <div className="holes-list" >
    {
      items.map(({ isActive, id }) =>
        <Hole
          key={id}
          id={id}
          isActive={isActive}
          onMoleClick={onMoleClick}
        />
      )
    }
  </div>
);

HolesList.defaultProps = {
  items: []
};

HolesList.propTypes = {
  items: PropTypes.array.isRequired,
  onMoleClick: PropTypes.func.isRequired
};

export default HolesList;
