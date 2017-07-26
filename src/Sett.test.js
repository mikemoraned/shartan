import { Sett, Repeat, Reverse } from "./Sett";
import { ThreadCounts, ThreadCount } from "./ThreadCounts";

const pattern = [
    new ThreadCount("K", 4),
    new ThreadCount("R", 24)
];

test('no pivot means empty ThreadCounts', () => {
    const sett = new Sett(pattern);
    const threadCounts = sett.pivoted([]);
    expect(threadCounts).toEqual(new ThreadCounts([]));
});

test('Repeat pivot just gives Sett pattern', () => {
    const sett = new Sett(pattern);
    const threadCounts = sett.pivoted([Repeat]);
    expect(threadCounts).toEqual(new ThreadCounts(pattern));
});

test('Reverse pivot gives Sett pattern in reverse', () => {
    const sett = new Sett(pattern);
    const threadCounts = sett.pivoted([Reverse]);
    expect(threadCounts).toEqual(new ThreadCounts([new ThreadCount("R", 24), new ThreadCount("K", 4)]));
});

test('multiple pivots gives flatted pattern', () => {
    const sett = new Sett(pattern);
    const threadCounts = sett.pivoted([Reverse, Repeat, Reverse]);
    expect(threadCounts).toEqual(new ThreadCounts([
        new ThreadCount("R", 24), new ThreadCount("K", 4),
        new ThreadCount("K", 4), new ThreadCount("R", 24),
        new ThreadCount("R", 24), new ThreadCount("K", 4)
    ]));
});
