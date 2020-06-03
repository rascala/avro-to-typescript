import * as chai from "chai";
import * as fs from "fs";
import * as path from "path";
import { ClassConverter } from "../../../src";

const expect = chai.expect;

chai.should();

const dataFolder = path.resolve(`./test/data/`);
const avroFolder = path.resolve(dataFolder + `/avro/`);
const compiledFolder = path.resolve(dataFolder + `/expected/`);

const getExpectedResult = (file: string) => {
    return fs.readFileSync(file).toString();
};

const toCamelCase = (name: string) => {
    return name.replace(
        /(\w)\.(\w)/gu,
        (match, p1: string, p2: string) => `${p1}${p2.toUpperCase()}`,
    );
};

const imports = [
    "import { logicalTypes } from \"@your/library\";",
];

describe("RecordType Converter test", () => {
    it("should convert User avro schema to TS class", () => {
        const converter = new ClassConverter({
            transformName: toCamelCase,
            imports,
            logicalTypesClass: "logicalTypes",
        });
        converter.convert(`${avroFolder}/User.avsc`);

        const actual = converter.joinExports();
        const expected = getExpectedResult(`${compiledFolder}/User.ts.test`);
        expect(actual).to.deep.equal(expected);
    });

    it("should convert TradeCollection avro schema to TS class", () => {
        const converter = new ClassConverter({
            transformName: toCamelCase,
            imports,
            logicalTypesClass: "logicalTypes",
        });
        converter.convert(`${avroFolder}/TradeCollection.avsc`);

        const actual = converter.joinExports();
        const expected = getExpectedResult(`${compiledFolder}/TradeCollection.ts.test`);
        expect(actual).to.deep.equal(expected);
    });
});
