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
describe("RecordType Converter test", () => {
    it("should convert User avro schema to TS class", () => {
        const converter = new src_1.ClassConverter();
        converter.convert(`${avroFolder}/User.avsc`);
        const actual = converter.joinExports();
        const expected = getExpectedResult(`${compiledFolder}/User.ts.test`);
        expect(actual).to.deep.equal(expected);
    });
    it("should convert TradeCollection avro schema to TS class", () => {
        const converter = new src_1.ClassConverter();
        converter.convert(`${avroFolder}/TradeCollection.avsc`);
        const actual = converter.joinExports();
        const expected = getExpectedResult(`${compiledFolder}/TradeCollection.ts.test`);
        expect(actual).to.deep.equal(expected);
    });
});
//# sourceMappingURL=ClassConverter.js.map