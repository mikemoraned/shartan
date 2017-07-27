import * as React from "react";
import { ColorMap } from "./ColorMap";
import { Sett, Repeat, Reverse } from "./Sett";

class Shartan extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sett: this.parseSett(props),
            colorMap: new ColorMap(),
            dimensions : {
                width: props.width,
                height: props.width
            }
        };
    }

    parseSett(props) {
        return props.sett == null ? Sett.parse("K4 R24 K24 Y4") : Sett.parse(props.sett);
    }

    componentDidMount() {
        this.updateCanvas();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            sett: this.parseSett(nextProps)
        });
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    updateCanvas() {
        const { width, height } = this.state.dimensions;
        const { sett } = this.state;

        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);

        this.drawWarp(ctx, sett.pivoted([Repeat, Reverse, Repeat, Reverse]));
        this.drawWeft(ctx, sett.pivoted([Reverse, Repeat, Reverse, Repeat]));
    }

    drawWarp(context, threadCounts) {
        let lastEndX = 0;
        threadCounts.mapPercentages((percentage, threadCount) => {
            const width = this.state.dimensions.width * (percentage / 100);
            const height = this.state.dimensions.height;

            context.fillStyle = this.state.colorMap.colorFor(threadCount.colorName);
            context.fillRect(lastEndX, 0, width, height);

            lastEndX = lastEndX + width;
        })
    }

    drawWeft(context, threadCounts) {
        const prevGlobalAlpha = context.globalAlpha;
        context.globalAlpha = 0.5;
        let lastEndY = 0;
        threadCounts.mapPercentages((percentage, threadCount) => {
            const width = this.state.dimensions.width;
            const height = this.state.dimensions.height * (percentage / 100);

            context.fillStyle = this.state.colorMap.colorFor(threadCount.colorName);
            context.fillRect(0, lastEndY, width, height);

            lastEndY = lastEndY + height;
        });
        context.globalAlpha = prevGlobalAlpha;
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