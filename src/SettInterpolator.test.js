import { Sett } from "./Sett";
import {SettInterpolator} from "./SettInterpolator";
import {ColorMap} from "./ColorMap";

describe("sequence", () => {

    test("generates start and end for changing count in single thread count", () => {
        const settInterp = new SettInterpolator(new ColorMap());
        const startSett = Sett.parse("Y16");
        const endSett = Sett.parse("Y25");
        const expectedSequence = Sett.parseAll([
            "Y16",
            "Y25",
        ]);
        expect(settInterp.asSequence(startSett, endSett, 2)).toEqual(expectedSequence);
    })

    test("generates start, middle and end for changing count in single thread count", () => {
        const settInterp = new SettInterpolator(new ColorMap());
        const startSett = Sett.parse("Y16");
        const endSett = Sett.parse("Y25");
        const expectedSequence = Sett.parseAll([
            "Y16",
            "Y20",
            "Y25",
        ]);
        expect(settInterp.asSequence(startSett, endSett, 3)).toEqual(expectedSequence);
    })

    test("generates start and end for changing name in single thread count", () => {
        const settInterp = new SettInterpolator(new ColorMap());
        const startSett = Sett.parse("Y16");
        const endSett = Sett.parse("LG16");
        const expectedSequence = Sett.parseAll([
            "Y16",
            "LG16",
        ]);
        expect(settInterp.asSequence(startSett, endSett, 2)).toEqual(expectedSequence);
    })

    test("generates start, middle and end for changing name in single thread count", () => {
        const settInterp = new SettInterpolator(new ColorMap());
        const startSett = Sett.parse("Y16");
        const endSett = Sett.parse("LG16");
        const expectedSequence = Sett.parseAll([
            "Y16",
            "DY16",
            "LG16",
        ]);
        expect(settInterp.asSequence(startSett, endSett, 3)).toEqual(expectedSequence);
    })

    test("generates start and end for changing name and count in single thread count", () => {
        const settInterp = new SettInterpolator(new ColorMap());
        const startSett = Sett.parse("Y16");
        const endSett = Sett.parse("LG25");
        const expectedSequence = Sett.parseAll([
            "Y16",
            "LG25",
        ]);
        expect(settInterp.asSequence(startSett, endSett, 2)).toEqual(expectedSequence);
    })

    test("generates start, middle and end for changing name and count in single thread count", () => {
        const settInterp = new SettInterpolator(new ColorMap());
        const startSett = Sett.parse("Y16");
        const endSett = Sett.parse("LG25");
        const expectedSequence = Sett.parseAll([
            "Y16",
            "DY20",
            "LG25",
        ]);
        expect(settInterp.asSequence(startSett, endSett, 3)).toEqual(expectedSequence);
    })

    test("generates start, middle and end for changing name and count in multiple thread counts", () => {
        const settInterp = new SettInterpolator(new ColorMap());
        const startSett = Sett.parse("K17 Y16");
        const endSett = Sett.parse("N5 LG25");
        const expectedSequence = Sett.parseAll([
            "K17 Y16",
            "DN11 DY20",
            "N5 LG25",
        ]);
        expect(settInterp.asSequence(startSett, endSett, 3)).toEqual(expectedSequence);
    })


    // test("generates full sequence for changing count", () => {
    //     const settInterp = new SettInterpolator();
    //     const startSett = Sett.parse("K17 Y16");
    //     const endSett = Sett.parse("K24 Y25");
    //     const expectedSequence = Sett.parseAll([
    //         "K17 Y16",
    //         "K18 Y17",
    //         "K19 Y18",
    //         "K21 Y19",
    //         "K22 Y20",
    //         "K23 Y21",
    //         "K23 Y22",
    //         "K24 Y23",
    //         "K24 Y24",
    //         "K24 Y25",
    //     ]);
    // })
});
