"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const avro = require("avsc");
const typescript_memoize_1 = require("typescript-memoize");
class BaseAvroRecord {
    static getTypeForSchema(schema, opts) {
        return avro.Type.forSchema(schema, opts);
    }
    static getType(opts) {
        return this.getTypeForSchema(this.schema, opts);
    }
    static createTypeResolver(baseType, newType) {
        return baseType.createResolver(newType);
    }
    static internalDeserialize(buffer, newSchema) {
        const baseType = BaseAvroRecord.getTypeForSchema(this.schema);
        let resolver;
        let noCheck = false;
        if (newSchema !== undefined) {
            const newType = BaseAvroRecord.getTypeForSchema(newSchema);
            resolver = BaseAvroRecord.createTypeResolver(baseType, newType);
            noCheck = true;
        }
        return baseType.fromBuffer(buffer, resolver, noCheck);
    }
    loadValuesFromType(type) {
        this.loadObjectValues(this, type, this.transformation());
    }
    serialize() {
        const type = BaseAvroRecord.getTypeForSchema(this.schema());
        return type.toBuffer(this);
    }
    transformation() {
        return {};
    }
    loadObjectValues(result, object, transformation = {}) {
        Object.keys(object).forEach((key) => {
            if (transformation.hasOwnProperty(key) && object[key] !== null) {
                if (Array.isArray(object[key])) {
                    result[key] = object[key].map(transformation[key]);
                }
                else {
                    result[key] = transformation[key](object[key]);
                }
            }
            else {
                result[key] = object[key];
            }
        });
    }
}
BaseAvroRecord.subject = "";
BaseAvroRecord.schema = {};
__decorate([
    typescript_memoize_1.Memoize((schema) => {
        return schema.namespace + schema.name;
    })
], BaseAvroRecord, "getTypeForSchema", null);
__decorate([
    typescript_memoize_1.Memoize((schema) => {
        return schema.namespace + schema.name;
    })
], BaseAvroRecord, "createTypeResolver", null);
exports.BaseAvroRecord = BaseAvroRecord;
//# sourceMappingURL=BaseAvroRecord.js.map