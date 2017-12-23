import * as React from "react";
import tartan from 'tartan';
import 'tartan-schema';
import 'tartan-processing';
import 'tartan-render';

const schema = tartan.schema.extended;

function errorHandler(error, data, severity) {
    console.log(error, data, severity);
}

const parse = schema.parse({
    errorHandler: errorHandler,
    transformSyntaxTree: tartan.transform.optimize()
});

const format = schema.format({
    defaultColors: schema.colors,
    includeUnusedColors: false,
    includeDefaultColors: true
});


class Shartan extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
          sett: parse('K18 DO5 LY6 DO5 G9 LN16'),
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
        const { sett } = this.state;

        const render = tartan.render.canvas(sett, {
            defaultColors: schema.colors,
            transformSyntaxTree: tartan.transform.flatten()
        });

        render(this.refs.canvas, { x: 0, y: 0});
    }

    render() {
        return (
            <canvas ref="canvas"
                    width={this.state.dimensions.width}
                    height={this.state.dimensions.height}
            />
        );
    }
}

export default Shartan;
