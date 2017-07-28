import React, { Component } from 'react';
import './App.css';

import Shartan from "./Shartan";
import {SettGenerator} from "./SettGenerator";
import {ColorMap} from "./ColorMap";

class App extends Component {
    constructor() {
        super();

        const settGen = new SettGenerator(new ColorMap());
        const sett = settGen.settFrom(`${new Date().toISOString()}`);
        this.state = {
            sett: sett.toString(),
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
