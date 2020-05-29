"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
class DirHelper {
    static mkdirIfNotExist(dir) {
        if (this.exists(dir)) {
            return;
        }
        console.log("Directory doesn't exist, creating it...");
        return dir
            .split(path.sep)
            .reduce((currentPath, folder) => {
            currentPath += folder + path.sep;
            if (!fs.existsSync(currentPath)) {
                fs.mkdirSync(currentPath);
            }
            return currentPath;
        }, "");
    }
    static exists(dir) {
        return fs.existsSync(dir);
    }
}
exports.DirHelper = DirHelper;
//# sourceMappingURL=DirHelper.js.map