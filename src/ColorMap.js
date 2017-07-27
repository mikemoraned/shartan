export class ColorMap {
    constructor() {
        this.colors = {
            LR: "#CC6666",
            R:  "#FF0000",
            DR: "#990000",
            O:  "#FF6600",
            DO: "#CC6600",
            LY: "#FFFF99",
            Y:  "#FFFF00",
            DY: "#CC9900",
            LG: "#99CC99",
            G:  "#009900",
            DG: "#003300",
            LB: "#00FFFF",
            B:  "#3399CC",
            DB: "#330099",
            LP: "#CC99CC",
            P:  "#9900FF",
            DP: "#330033",
            W:  "#FFFFFF",
            LN: "#CCCCCC",
            N:  "#999999",
            DN: "#333333",
            K:  "#000000",
            LT: "#999966",
            T:  "#663300",
            DT: "#330000"
        };
    }

    colorFor(name) {
        return this.colors[name];
    }
}
