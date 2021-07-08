export class ColorMap {
    constructor() {
        const pairs = [
            [ "LR", "#CC6666" ],
            [ "R",  "#FF0000" ],
            [ "DR", "#990000" ],
            [ "O",  "#FF6600" ],
            [ "DO", "#CC6600" ],
            [ "LY", "#FFFF99" ],
            [ "Y",  "#FFFF00" ],
            [ "DY", "#CC9900" ],
            [ "LG", "#99CC99" ],
            [ "G",  "#009900" ],
            [ "DG", "#003300" ],
            [ "LB", "#00FFFF" ],
            [ "B",  "#3399CC" ],
            [ "DB", "#330099" ],
            [ "LP", "#CC99CC" ],
            [ "P",  "#9900FF" ],
            [ "DP", "#330033" ],
            [ "W",  "#FFFFFF" ],
            [ "LN", "#CCCCCC" ],
            [ "N",  "#999999" ],
            [ "DN", "#333333" ],
            [ "K",  "#000000" ],
            [ "LT", "#999966" ],
            [ "T",  "#663300" ],
            [ "DT", "#330000" ],
        ];
        this.colorForNameMap = new Map();
        pairs.forEach((pair) => {
            const [ name, color ] = pair;
            this.colorForNameMap.set(name, color);
        });
        this.nameForIndexArray = [];
        pairs.forEach((pair) => {
            const [ name, color ] = pair;
            this.nameForIndexArray.push(name);
        });
    }

    colorForName(name) {
        return this.colorForNameMap.get(name);
    }

    get length() {
        return this.colorForNameMap.size;
    }

    nameForIndex(searchIndex) {
        if (searchIndex < this.nameForIndexArray.length) {
            return this.nameForIndexArray[searchIndex];
        }
        throw `no name for index ${searchIndex}`;
    }

    indexForName(searchName) {
        const index = this.nameForIndexArray.findIndex((name) => name === searchName);
        if (index != -1) {
            return index;
        }
        throw `no name for index ${searchName}`;
    }
}
