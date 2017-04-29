import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Whack-a-mole! <span className="score">0</span></h1>
        <button className="js-start">Start!</button>
        <div className="game">
          <div className="hole hole1">
            <div className="mole"></div>
          </div>
          <div className="hole hole2">
            <div className="mole"></div>
          </div>
          <div className="hole hole3">
            <div className="mole"></div>
          </div>
          <div className="hole hole4">
            <div className="mole"></div>
          </div>
          <div className="hole hole5">
            <div className="mole"></div>
          </div>
          <div className="hole hole6">
            <div className="mole"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
