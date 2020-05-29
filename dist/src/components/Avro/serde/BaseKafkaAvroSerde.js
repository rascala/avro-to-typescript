"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NullCompression_1 = require("../compression/NullCompression");
const ZlibAdapter_1 = require("../compression/ZlibAdapter");
const KafkaAvroMessage_1 = require("../KafkaAvroMessage");
const CachedSchemaRegistryClient_1 = require("../schema_registry/CachedSchemaRegistryClient");
class BaseKafkaAvroSerde {
    constructor(registryClientConfig) {
        this._dataCompression = new ZlibAdapter_1.ZlibAdapter();
        this.schemaRegistryClient = new CachedSchemaRegistryClient_1.CachedSchemaRegistryClient(registryClientConfig);
    }
    get dataCompression() {
        return this._dataCompression;
    }
    set dataCompression(value) {
        this._dataCompression = value;
    }
    disableCompression() {
        this._dataCompression = new NullCompression_1.NullCompression();
    }
    toKafkaAvroMessage(buffer) {
        return KafkaAvroMessage_1.KafkaAvroMessage.fromBuffer(this.dataCompression.decompress(buffer));
    }
    toBuffer(kafkaAvroMessage) {
        return this.dataCompression.compress(kafkaAvroMessage.toBuffer());
    }
}
exports.BaseKafkaAvroSerde = BaseKafkaAvroSerde;
//# sourceMappingURL=BaseKafkaAvroSerde.js.map