"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KafkaAvroMessage_1 = require("../KafkaAvroMessage");
const BaseKafkaAvroSerde_1 = require("./BaseKafkaAvroSerde");
class KafkaAvroSerializer extends BaseKafkaAvroSerde_1.BaseKafkaAvroSerde {
    async serialize(obj) {
        const schema = await this.schemaRegistryClient.registerSubjectVersion(obj.subject(), obj.schema());
        const schemaId = schema.id;
        const buffer = obj.serialize();
        const kafkaAvroMessage = new KafkaAvroMessage_1.KafkaAvroMessage(schemaId, buffer);
        return this.toBuffer(kafkaAvroMessage);
    }
}
exports.KafkaAvroSerializer = KafkaAvroSerializer;
//# sourceMappingURL=KafkaAvroSerializer.js.map