import { ThreadCount, ThreadCounts } from "./ThreadCounts";

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

    pivoted(pivots) {
        const patterns = pivots.map((pivot) => pivot(this.pattern));
        const combined = patterns.reduce((combined, p) => combined.concat(p), []);
        return new ThreadCounts(combined);
    }
}