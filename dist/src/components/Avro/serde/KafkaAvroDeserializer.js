"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseKafkaAvroSerde_1 = require("./BaseKafkaAvroSerde");
class KafkaAvroDeserializer extends BaseKafkaAvroSerde_1.BaseKafkaAvroSerde {
    constructor() {
        super(...arguments);
        this.knownSchemas = new Map();
    }
    async deserialize(buffer, deserType) {
        const kafkaAvroMessage = this.toKafkaAvroMessage(buffer);
        const schemaId = kafkaAvroMessage.schemaId;
        let newSchema = this.knownSchemas.get(schemaId);
        if (newSchema === undefined) {
            const newSchemaRaw = await this.schemaRegistryClient.getSchemaById(schemaId);
            newSchema = JSON.parse(newSchemaRaw.schema);
            this.knownSchemas.set(schemaId, newSchema);
        }
        const avroBuffer = kafkaAvroMessage.avroBuffer;
        return deserType.deserialize(avroBuffer, newSchema);
    }
}
exports.KafkaAvroDeserializer = KafkaAvroDeserializer;
//# sourceMappingURL=KafkaAvroDeserializer.js.map