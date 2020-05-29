"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConsoleHelper {
    static info(msg) {
        console.info(msg);
    }
    static getArgs() {
        const args = process.argv;
        args.splice(0, 2);
        return args;
    }
    static getUsage() {
        return this._usage;
    }
    static break(error) {
        console.error(error);
        console.info(this.getUsage());
        process.exit();
    }
}
ConsoleHelper._usage = "Check --help";
exports.ConsoleHelper = ConsoleHelper;
//# sourceMappingURL=ConsoleHelper.js.map