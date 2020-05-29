#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const args = require("command-line-args");
const cmdusage = require("command-line-usage");
const fs = require("fs");
const path = require("path");
const Compiler_1 = require("./components/Compiler/Compiler");
const ConsoleHelper_1 = require("./helpers/ConsoleHelper");
const cmdOptions = [
    {
        name: "compile",
        alias: "c",
        type: String,
        typeLabel: "{underline schema-directory} {underline output-directory}",
        description: "Compile schema directory into output directory",
        multiple: true,
    },
    {
        name: "help",
        alias: "h",
        description: "Print this usage guide.",
    },
    {
        name: "logical-types",
        type: String,
        typeLabel: "{underline logical-type} {underline typescript-type}",
        description: "Use logical types",
        multiple: true,
    },
];
const usageOptions = [
    {
        header: "avro-to-typescript",
        content: "Compile avro schemas to typescript classes with ease. It will output to set directory " +
            "and append namespace to path.",
    },
    {
        header: "Options",
        optionList: cmdOptions,
    },
    {
        content: "Project home: {underline https://github.com/degordian/avro-to-typescript}",
    },
];
let options;
let usage;
try {
    options = args(cmdOptions);
    console.log(options);
    usage = cmdusage(usageOptions);
}
catch (e) {
    ConsoleHelper_1.ConsoleHelper.break("Invalid value or option used");
}
if (options === undefined) {
    throw new Error();
}
if (options.compile) {
    let schemaDir = options.compile[0];
    let classDir = options.compile[1];
    if (schemaDir === undefined || classDir === undefined) {
        ConsoleHelper_1.ConsoleHelper.break("Undefined");
    }
    classDir = path.resolve(classDir);
    schemaDir = path.resolve(schemaDir);
    if (!fs.existsSync(schemaDir) || !fs.existsSync(classDir)) {
        ConsoleHelper_1.ConsoleHelper.break("The directory does not exist or is invalid");
    }
    const logicalTypes = {};
    const logicalTypesMap = options["logical-types"];
    if (logicalTypesMap && logicalTypesMap.length) {
        for (let index = 0; index < logicalTypesMap.length; index += 2) {
            if (!logicalTypesMap[index + 1]) {
                ConsoleHelper_1.ConsoleHelper.break("Invalid logical-types, you must alternate logical type with typescript type");
            }
            logicalTypes[logicalTypesMap[index]] = logicalTypesMap[index + 1];
        }
    }
    const compiler = new Compiler_1.Compiler(classDir, logicalTypes);
    compiler.compileFolder(schemaDir);
}
if (options.help !== undefined) {
    console.log(usage);
}
//# sourceMappingURL=cli.js.map