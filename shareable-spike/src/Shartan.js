import * as React from "react";
import Sett from './shared/shartan/Sett';
import CanvasRenderer from './shared/shartan/CanvasRenderer';

class Shartan extends React.Component {

    constructor(props) {
      super(props);

      this.renderer = new CanvasRenderer();
      this.state = {
        sett: new Sett(),
        dimensions : {
            width: props.width,
            height: props.width
        }
      };
    }

    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    updateCanvas() {
        const { dimensions } = this.state;
        const { sett } = this.state;

        const context = this.refs.canvas.getContext('2d');
        this.renderer.renderSett(sett, context, dimensions);
    }

    render() {
        return (
            <canvas ref="canvas"
                    width={this.state.dimensions.width}
                    height={this.state.dimensions.height}/>
        );
    }
}

export default Shartan;
