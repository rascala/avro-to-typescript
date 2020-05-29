"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KafkaAvroDeserializer_1 = require("./KafkaAvroDeserializer");
const KafkaAvroSerializer_1 = require("./KafkaAvroSerializer");
class KafkaAvroFactory {
    constructor(avroRegistryConfiguration) {
        this.avroRegistryConfiguration = avroRegistryConfiguration;
    }
    createSerializer() {
        return new KafkaAvroSerializer_1.KafkaAvroSerializer(this.avroRegistryConfiguration);
    }
    createDeserializer() {
        return new KafkaAvroDeserializer_1.KafkaAvroDeserializer(this.avroRegistryConfiguration);
    }
}
exports.KafkaAvroFactory = KafkaAvroFactory;
//# sourceMappingURL=KafkaAvroFactory.js.map