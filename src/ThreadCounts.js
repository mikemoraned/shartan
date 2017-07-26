export class ThreadCounts {
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

export class ThreadCount {
    constructor(colorName, count) {
        this.colorName = colorName;
        this.count = count;
    }
}