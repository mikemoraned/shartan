export class ThreadCounts {
    constructor(counts) {
        this.counts = counts;
    }

    mapPercentages(fn) {
        const total = this.counts.reduce((sum, t) => sum + t.count, 0);
        return this.counts.map((threadCount, index) => {
            const percentage = (100.0 * threadCount.count) / total;
            return fn(percentage, threadCount, index);
        });
    }
}

export class ThreadCount {
    constructor(colorName, count) {
        this.colorName = colorName;
        this.count = count;
    }
}