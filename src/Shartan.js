import * as React from "react";

class ThreadCounts {
    constructor(counts) {
        this.counts = counts;
    }

    mapPercentages(fn) {
        const total = this.counts.reduce((sum, t) => sum + t.count, 0);
        return this.counts.map((threadCount) => {
            console.dir(threadCount);
            const percentage = (100.0 * threadCount.count) / total;
            return fn(percentage, threadCount);
        });
    }
}

class ThreadCount {
    constructor(colorName, count) {
        this.colorName = colorName;
        this.count = count;
    }
}

class ColorMap {
    constructor() {
        this.colors = {
            K: "black",
            R: "red",
            Y: "yellow",
        };
    }

    colorFor(name) {
        return this.colors[name];
    }
}

const Repeat = (pattern) => {
    return Array.from(pattern);
}

const Reverse = (pattern) => {
    let copy = Array.from(pattern);
    copy.reverse();
    return copy;
}

class Sett {
    constructor() {
        this.pattern = [
            new ThreadCount("K", 4),
            new ThreadCount("R", 24),
            new ThreadCount("K", 24),
            new ThreadCount("Y", 4),
        ];
    }

    pivoted(pivots) {
        const patterns = pivots.map((pivot) => pivot(this.pattern));
        const combined = patterns.reduce((combined, p) => combined.concat(p), []);
        return new ThreadCounts(combined);
    }
}

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
            threadCounts.mapPercentages((percentage, threadCount) => {
                const width = `${percentage}%`;
                const color = colorMap.colorFor(threadCount.colorName);
                return <Vertical color={color} width={width}/>;
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
            threadCounts.mapPercentages((percentage, threadCount) => {
                const height = `${percentage}%`;
                const color = colorMap.colorFor(threadCount.colorName);
                return <Horizontal color={color} height={height} />;
            })
        }
    </div>;
}

const Shartan = () => {
    const dimensions = {
        width: 400,
        height: 400
    }

    const bgStyle = {
        height: "400px",
        width: "400px",
        position: "absolute",
        top: "0px"
    };

    const sett = new Sett();
    const colorMap = new ColorMap();

    return <div style={bgStyle}>
        <Warp threadCounts={sett.pivoted([Repeat, Reverse, Repeat, Reverse])}
              colorMap={colorMap} dimensions={dimensions}/>
        <Weft threadCounts={sett.pivoted([Reverse, Repeat, Reverse, Repeat])}
              colorMap={colorMap} dimensions={dimensions}/>
    </div>;
}

export default Shartan;