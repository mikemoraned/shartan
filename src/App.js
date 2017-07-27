import React, { Component } from 'react';
import './App.css';

import Shartan from "./Shartan";

class App extends Component {
    constructor() {
        super();
        this.state = {
            sett: "K4 R24 K9 Y4",
        };

        this.handleSettChange = this.handleSettChange.bind(this);
    }

    handleSettChange(event) {
        this.setState({sett: event.target.value});
    }

    render() {
      return (
        <div className="App">
          <Shartan sett={this.state.sett} width={400}/>
          <input style={{position: "absolute", top: 10, left: 10, zIndex: 1}}
                 type="text"
                 value={this.state.sett}
                 onChange={this.handleSettChange} />
        </div>
      );
    }
}

export default App;
