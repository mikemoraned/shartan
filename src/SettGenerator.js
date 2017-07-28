import { Sett, Repeat, Reverse } from "./Sett";
import {ThreadCount} from "./ThreadCounts";
import Stochator from "stochator";

export class SettGenerator {
    constructor(colorMap) {
        this.colorMap = colorMap;
        this.patternLength = 6;
        this.maxCount = 20;
    }

    settFrom(input) {
        const threadCountGen = this.randomThreadCountGenerator(input);
        const pattern = [];
        while (pattern.length < this.patternLength) {
            pattern.push(threadCountGen.next());
        }
        return new Sett(pattern);
    }

    randomThreadCountGenerator(input) {
        const indexSpec = { seed: input, kind: "integer", min: 0, max: this.colorMap.length - 1 };
        const countSpec = { seed: input, kind: "integer", min: 2, max: this.maxCount };
        return new Stochator(indexSpec, countSpec, ([index, count]) => {
            return new ThreadCount(this.colorMap.nameForIndex(index), count);
        });
    }
}