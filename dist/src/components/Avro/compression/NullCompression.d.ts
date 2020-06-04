/// <reference types="node" />
import { DataCompression } from "./DataCompression";
export declare class NullCompression implements DataCompression<Buffer, Buffer> {
    compress(buffer: Buffer): Buffer;
    decompress(buffer: Buffer): Buffer;
}
