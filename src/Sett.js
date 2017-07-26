import {ThreadCount, ThreadCounts} from "./ThreadCounts";

export const Repeat = (pattern) => {
    return Array.from(pattern);
}

export const Reverse = (pattern) => {
    let copy = Array.from(pattern);
    copy.reverse();
    return copy;
}

export class Sett {
    constructor(pattern) {
        this.pattern = pattern;
    }

    static parse(s) {
        const component = /(\w)(\d+)\s*/g;
        let pattern = [];
        let match;
        // eslint-disable-next-line
        while ((match = component.exec(s)) != null) {
            const name = match[1];
            const count = parseInt(match[2], 10);
            pattern.push(new ThreadCount(name, count))
        }

        return new Sett(pattern);
    }

    pivoted(pivots) {
        const patterns = pivots.map((pivot) => pivot(this.pattern));
        const combined = patterns.reduce((combined, p) => combined.concat(p), []);
        return new ThreadCounts(combined);
    }
}