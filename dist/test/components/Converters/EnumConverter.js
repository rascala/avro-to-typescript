"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const fs = require("fs");
const path = require("path");
const src_1 = require("../../../src");
const expect = chai.expect;
chai.should();
const dataFolder = path.resolve(`./test/data/`);
const avroFolder = path.resolve(dataFolder + `/avro/`);
const compiledFolder = path.resolve(dataFolder + `/expected/`);
const getExpectedResult = (file) => {
    return fs.readFileSync(file).toString();
};
describe("Enum Converter", () => {
    it(`should successfully convert Enum avro file to TS enum`, () => {
        const converter = new src_1.EnumConverter();
        converter.convert(`${avroFolder}/SimpleEnum.avsc`);
        const actual = converter.joinExports();
        const expected = getExpectedResult(`${compiledFolder}/SimpleEnum.ts.test`);
        expect(actual).to.deep.equal(expected);
    });
});
//# sourceMappingURL=EnumConverter.js.map