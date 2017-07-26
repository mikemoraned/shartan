import * as React from "react";

const Vertical = (props) => {
    const style = {
        backgroundColor: props.color,
        width: props.width,
        height: "100%",
        float: "left",
        opacity: "0.5"
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


const Shartan = () => {
    const bgStyle = {
        height: "400px",
        width: "400px"
    };
    const horizontalsStyle = {
        height: "400px",
        width: "400px",
        position: "relative",
        top: "0px"
    };

    const verticals = ["red", "blue", "green"];
    const horizontals = ["yellow", "blue", "red"];

    return <div style={bgStyle}>
        {
            verticals.map((color) => {
                const width = `${100.0 / verticals.length}%`;
                return <Vertical color={color} width={width} />;
            })
        }
        <div style={horizontalsStyle}>
        {
            horizontals.map((color) => {
                const height = `${100.0 / horizontals.length}%`;
                return <Horizontal color={color} height={height} />;
            })
        }
        </div>
    </div>;
}

export default Shartan;