import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game';
import './index.css';

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update')
  whyDidYouUpdate(React)
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
