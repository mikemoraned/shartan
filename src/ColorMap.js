export class ColorMap {
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
