import { Sett } from "./Sett";
import { SettGenerator } from "./SettGenerator";
import {ColorMap} from "./ColorMap";
import {ThreadCount} from "./ThreadCounts";

describe("random", () => {
    const seed = "hello world";

    const expectedSett = new Sett([
        new ThreadCount( "DB", 12 ), 
        new ThreadCount( "DO", 5 ), 
        new ThreadCount( "LR", 2 ), 
        new ThreadCount( "N",  16 ),
        new ThreadCount( "LN", 15 ), 
        new ThreadCount( "G",  9 )
    ]);

    test("generates expected sett from seed", () => {
        const settGen = new SettGenerator(new ColorMap());
        expect(settGen.settFrom(seed)).toEqual(expectedSett);
    })

    test("same generator instance generates expected sett from seed, when called repeatedly", () => {
        const settGen = new SettGenerator(new ColorMap());
        expect(settGen.settFrom(seed)).toEqual(expectedSett);
        expect(settGen.settFrom(seed)).toEqual(expectedSett);
    })

    test("different generator instances generate expected sett from same seed", () => {
        const settGen1 = new SettGenerator(new ColorMap());
        expect(settGen1.settFrom(seed)).toEqual(expectedSett);

        const settGen2 = new SettGenerator(new ColorMap());
        expect(settGen2.settFrom(seed)).toEqual(expectedSett);
    })

    test("different seed generates different sett", () => {
        const settGen = new SettGenerator(new ColorMap());
        expect(settGen.settFrom(seed)).toEqual(expectedSett);

        expect(settGen.settFrom(seed + " other stuff")).not.toEqual(expectedSett);
    })
});
