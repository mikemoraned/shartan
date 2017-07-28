import React, { Component } from 'react';
import './App.css';

import Shartan from "./Shartan";
import {SettGenerator} from "./SettGenerator";
import {ColorMap} from "./ColorMap";

class App extends Component {
    constructor() {
        super();

        this.settGen = new SettGenerator(new ColorMap());
        const sett = this.settGen.settFrom(`${new Date().toISOString()}`);

        this.handleSettChange = this.handleSettChange.bind(this);
        this.handleShartanClick = this.handleShartanClick.bind(this);

        this.state = {
            sett: sett.toString(),
        };
    }

    handleSettChange(event) {
        this.setState({sett: event.target.value});
    }

    handleShartanClick() {
        this.setState({
            sett: this.settGen.settFrom(`${new Date().toISOString()}`)
        });
    }

    render() {
      return (
        <div className="App">
          <Shartan sett={this.state.sett} width={400} onClick={this.handleShartanClick}/>
          <input style={{position: "absolute", top: 10, left: 10, zIndex: 1}}
                 type="text"
                 value={this.state.sett}
                 onChange={this.handleSettChange} />
        </div>
      );
    }
}

export default App;
