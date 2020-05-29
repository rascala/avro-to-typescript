"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class FileHelper {
    constructor(filePath) {
        this.filePath = filePath;
    }
    getContent() {
        return new Promise((resolve, reject) => {
            if (this.exists() === false) {
                reject(`File not found: ${this.filePath}`);
                return;
            }
            fs.readFile(this.filePath, {}, (error, content) => {
                if (error) {
                    console.log(error, "Err", this.filePath);
                    reject(error);
                    return;
                }
                resolve(content);
            });
        });
    }
    save(content) {
        return new Promise((resolve, reject) => {
            if (this.exists() === false) {
                reject(`File not found: ${this.filePath}`);
                return;
            }
            fs.writeFileSync(this.filePath, content);
            resolve(true);
        });
    }
    exists() {
        return fs.existsSync(this.filePath);
    }
    async create() {
        if (this.exists() === true) {
            return;
        }
        fs.writeFileSync(this.filePath, "");
    }
}
exports.FileHelper = FileHelper;
//# sourceMappingURL=FileHelper.js.map