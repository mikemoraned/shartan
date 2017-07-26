import * as React from "react";
import { ColorMap } from "./ColorMap";
import { Sett, Repeat, Reverse } from "./Sett";

const Vertical = (props) => {
    const style = {
        backgroundColor: props.color,
        width: props.width,
        height: "100%",
        float: "left"
    };

    return <div style={style}>&nbsp;</div>;
}

const Horizontal = (props) => {
    const style = {
        backgroundColor: props.color,
        width: "100%",
        height: props.height,
        opacity: "0.5"
    };

    return <div style={style}>&nbsp;</div>;
}

const Warp = (props) => {
    const threadCounts = props.threadCounts;
    const colorMap = props.colorMap;
    const dimensions = props.dimensions;
    const style = {
        height: `${dimensions.height}px`,
        width: `${dimensions.width}px`,
        position: "absolute",
        top: "0px"
    };

    return <div style={style}>
        {
            threadCounts.mapPercentages((percentage, threadCount, index) => {
                const width = `${percentage}%`;
                const color = colorMap.colorFor(threadCount.colorName);
                return <Vertical key={index} color={color} width={width}/>;
            })
        }
    </div>;
}

const Weft = (props) => {
    const threadCounts = props.threadCounts;
    const colorMap = props.colorMap;
    const dimensions = props.dimensions;
    const style = {
        height: `${dimensions.height}px`,
        width: `${dimensions.width}px`,
        position: "absolute",
        top: "0px"
    };

    return <div style={style}>
        {
            threadCounts.mapPercentages((percentage, threadCount, index) => {
                const height = `${percentage}%`;
                const color = colorMap.colorFor(threadCount.colorName);
                return <Horizontal key={index} color={color} height={height} />;
            })
        }
    </div>;
}

const Shartan = (props) => {
    const sett = props.sett == null ? Sett.parse("K4 R24 K24 Y4") : Sett.parse(props.sett);
    const colorMap = new ColorMap();

    const dimensions = {
        width: props.width,
        height: props.width
    }

    const bgStyle = {
        height: `${dimensions.height}px`,
        width: `${dimensions.width}px`,
        position: "absolute",
        top: "0px"
    };

    return <div style={bgStyle}>
        <Warp threadCounts={sett.pivoted([Repeat, Reverse, Repeat, Reverse])}
              colorMap={colorMap} dimensions={dimensions}/>
        <Weft threadCounts={sett.pivoted([Reverse, Repeat, Reverse, Repeat])}
              colorMap={colorMap} dimensions={dimensions}/>
    </div>;
}

export default Shartan;