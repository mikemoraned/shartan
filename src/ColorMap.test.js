import {ColorMap} from "./ColorMap";

test("has full set of colors", () => {
    expect(new ColorMap().length).toEqual(25);
})

test("can lookup color by name", () => {
    expect(new ColorMap().colorForName("K")).toEqual("#000000");
})

test("can lookup name by index", () => {
    expect(new ColorMap().nameForIndex(21)).toEqual("K");
})