import { Sett } from "./Sett";
import {ThreadCount} from "./ThreadCounts";
import { interpolateArray } from "d3-interpolate";

export class SettInterpolator {
    constructor(colorMap) {
        this.colorMap = colorMap;
    }

    asSequence(start, end, steps) {
        const fn = this.asFunction(start, end);

        const stepSize = 1.0 / (steps - 1);
        const sequence = [ fn(0) ];
        for (let step = 1; step < steps - 1; step++) {
            const t = step * stepSize;
            sequence.push(fn(t));
        }
        sequence.push(fn(1.0));
        return sequence;
    }

    asFunction(start, end) {
        const startArray = this.toNumberArray(start);
        const endArray = this.toNumberArray(end);

        const interpolator = interpolateArray(startArray, endArray);

        return (t) => {
            const array = interpolator(t);
            return this.toSett(array);
        };
    }

    toNumberArray(sett) {
        const array = [];
        sett.pattern.forEach((p) => {
            array.push(this.colorMap.indexForName(p.colorName));
            array.push(p.count);
        });
        return array;
    }

    toSett(array) {
        const pattern = [];
        for(let i = 0; i < array.length; i+=2) {
            const name = this.colorMap.nameForIndex(Math.floor(array[i]));
            const count = Math.floor(array[i+1]);
            pattern.push(new ThreadCount(name, count));
        }
        return new Sett(pattern);
    }
}