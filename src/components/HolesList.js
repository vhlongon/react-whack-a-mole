import React from 'react';
import Hole from './Hole';
import PropTypes from 'prop-types';
import './HolesList.css';

const HolesList = ({ items }) => (
  <div className="holes-list" >
    {
      items.map(({ isActive }, index) =>
        <Hole
          key={index}
          id={index}
          isActive={isActive}
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
};

export default HolesList;
