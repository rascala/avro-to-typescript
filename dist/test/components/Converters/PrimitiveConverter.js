"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const src_1 = require("../../../src");
const expect = chai.expect;
chai.should();
describe("Compile primitive types", () => {
    const primitivesMap = {
        number: [
            "int",
            "long",
            "double",
            "float",
        ],
        Buffer: [
            "bytes",
        ],
        null: [
            "null",
        ],
        boolean: [
            "boolean",
        ],
        string: [
            "string",
        ],
    };
    for (const expected in primitivesMap) {
        if (primitivesMap.hasOwnProperty(expected) === false) {
            continue;
        }
        for (const primitive of primitivesMap[expected]) {
            it(`should return ${expected} when given ${primitive}`, () => {
                const converter = new src_1.PrimitiveConverter();
                const actual = converter.convert(primitive);
                expect(expected).equal(actual);
            });
        }
    }
});
//# sourceMappingURL=PrimitiveConverter.js.map