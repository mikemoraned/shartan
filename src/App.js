import React, { Component } from 'react';
import './App.css';

import Shartan from "./Shartan";
import {SettGenerator} from "./SettGenerator";
import {ColorMap} from "./ColorMap";
import {SettInterpolator} from "./SettInterpolator";
import {Sett} from "./Sett";
import { easeCubicInOut } from "d3-ease";

class App extends Component {
    constructor() {
        super();

        const colorMap = new ColorMap();
        this.settGen = new SettGenerator(colorMap);
        this.settInterp = new SettInterpolator(colorMap);
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
        const startDate = new Date();
        const transitionDuration = 1 * 1000;
        const targetDate = new Date(); targetDate.setTime(startDate.getTime() + transitionDuration);
        const target = this.settGen.settFrom(`${targetDate.toISOString()}`);

        const transitionFn = this.settInterp.asFunction(Sett.parse(this.state.sett), target);
        const ease = easeCubicInOut;

        const updateStateFn = () => {
            const currentDate = new Date();
            if (currentDate < targetDate) {
                const t = (targetDate.getTime() - currentDate.getTime()) / transitionDuration;
                this.setState({
                    sett: transitionFn(ease(t)).toString()
                });
                requestAnimationFrame(updateStateFn);
            }
            else {
                this.setState({
                    sett: transitionFn(1.0).toString()
                });
            }
        }
        updateStateFn();
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
