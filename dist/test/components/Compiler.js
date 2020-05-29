"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const fs = require("fs-extra");
const path = require("path");
const src_1 = require("../../src");
const expect = chai.expect;
chai.should();
const dataFolder = path.resolve(`${__dirname}/../../../test/data/`);
const avroFolder = path.resolve(dataFolder + `/avro/`);
const expectedFolder = path.resolve(dataFolder + `/expected/`);
const compiledFolder = path.resolve(dataFolder + `/compiled/`);
describe("Testing Compiler", () => {
    afterEach(() => {
        fs.removeSync(compiledFolder + "/com");
        fs.removeSync(compiledFolder + "/BaseAvroRecord.ts");
    });
    it(`should create User class when given User avro schema`, async () => {
        const avro = `${avroFolder}/User.avsc`;
        const compiledFile = `${compiledFolder}/com/example/avro/User.ts`;
        const expectedFile = `${expectedFolder}/User.ts.test`;
        const compiler = new src_1.Compiler(compiledFolder);
        await compiler.compile(avro);
        const actual = fs.readFileSync(compiledFile).toString();
        const expected = fs.readFileSync(expectedFile).toString();
        expect(actual).to.deep.equal(expected);
    });
    it(`should create TradeCollection class when given TradeCollection avro schema`, async () => {
        const avro = `${avroFolder}/TradeCollection.avsc`;
        const compiledFile = `${compiledFolder}/com/example/avro/TradeCollection.ts`;
        const expectedFile = `${expectedFolder}/TradeCollection.ts.test`;
        const compiler = new src_1.Compiler(compiledFolder);
        await compiler.compile(avro);
        const actual = fs.readFileSync(compiledFile).toString();
        const expected = fs.readFileSync(expectedFile).toString();
        expect(actual).to.deep.equal(expected);
    });
    it(`should create BaseAvroRecord file after compiling User schema`, async () => {
        const avro = `${avroFolder}/User.avsc`;
        const compiledFile = `${compiledFolder}/BaseAvroRecord.ts`;
        const expectedFile = `${expectedFolder}/BaseAvroRecord.ts.test`;
        const compiler = new src_1.Compiler(compiledFolder);
        await compiler.compile(avro);
        const actual = fs.readFileSync(compiledFile).toString();
        const expected = fs.readFileSync(expectedFile).toString();
        expect(actual).to.deep.equal(expected);
    });
});
//# sourceMappingURL=Compiler.js.map