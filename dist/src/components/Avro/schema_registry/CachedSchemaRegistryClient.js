"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_registry_1 = require("schema-registry");
const typescript_memoize_1 = require("typescript-memoize");
class CachedSchemaRegistryClient {
    constructor(config) {
        this._defaultLogger = {
            info: () => {
                return;
            },
            log: () => {
                return;
            },
            error: () => {
                return;
            },
        };
        const clientConfig = {
            type: "avro",
            host: config.host,
            port: config.port,
            logger: (config.logger !== undefined) ? config.logger : this._defaultLogger,
        };
        this.client = new schema_registry_1.RegistryClient(clientConfig);
    }
    async getSchemaById(id) {
        return await this.client.getSchemaById(id);
    }
    async registerSubjectVersion(subject, schema) {
        return await this.client.registerSubjectVersion(subject, schema);
    }
}
__decorate([
    typescript_memoize_1.Memoize()
], CachedSchemaRegistryClient.prototype, "getSchemaById", null);
__decorate([
    typescript_memoize_1.Memoize()
], CachedSchemaRegistryClient.prototype, "registerSubjectVersion", null);
exports.CachedSchemaRegistryClient = CachedSchemaRegistryClient;
//# sourceMappingURL=CachedSchemaRegistryClient.js.map