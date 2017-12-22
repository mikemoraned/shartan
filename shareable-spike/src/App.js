import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Shartan from './Shartan';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Shartan width={100} height={100} />
      </div>
    );
  }
}

export default App;
