import { Sett, Repeat, Reverse } from "./Sett";
import { ThreadCounts, ThreadCount } from "./ThreadCounts";

const pattern = [
    new ThreadCount("K", 4),
    new ThreadCount("R", 24)
];

describe("pivoted", () => {
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
});

describe("parse", () => {
    test('empty string is empty Sett', () => {
        const sett = Sett.parse("");
        expect(sett).toEqual(new Sett([]));
    });

    test('single thread count', () => {
        const sett = Sett.parse("K4");
        expect(sett).toEqual(new Sett([new ThreadCount("K", 4)]));
    });

    test('multiple thread count', () => {
        const sett = Sett.parse("K4 R24");
        expect(sett).toEqual(new Sett([new ThreadCount("K", 4), new ThreadCount("R", 24)]));
    });

    test('case does not matter in color name', () => {
        const sett = Sett.parse("k4 r24");
        expect(sett).toEqual(new Sett([new ThreadCount("K", 4), new ThreadCount("R", 24)]));
    });

    test('two letter color codes allowed', () => {
        const sett = Sett.parse("K4 LR24");
        expect(sett).toEqual(new Sett([new ThreadCount("K", 4), new ThreadCount("LR", 24)]));
    });
});

describe("parseAll", () => {
    test('multiple strings', () => {
        const setts = Sett.parseAll(["K4","R24"]);
        expect(setts).toEqual([
            new Sett([new ThreadCount("K", 4)]),
            new Sett([new ThreadCount("R", 24)])
        ]);
    });
});


describe("toString", () => {
    test('empty Sett is empty string', () => {
        expect(new Sett([]).toString()).toEqual("");
    });

    test('can round-trip empty Sett through parse', () => {
        expect(Sett.parse(new Sett([]).toString())).toEqual(new Sett([]));
    });

    test('non-empty Sett toString is space-separated pattern', () => {
        expect(new Sett(pattern).toString()).toEqual("K4 R24");
    });

    test('can round-trip non-empty Sett through parse', () => {
        expect(Sett.parse(new Sett(pattern).toString())).toEqual(new Sett(pattern));
    });
});