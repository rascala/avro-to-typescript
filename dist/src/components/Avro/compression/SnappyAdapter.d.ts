/// <reference types="node" />
import { DataCompression } from "./DataCompression";
export declare class SnappyAdapter implements DataCompression<Buffer, Buffer> {
    private static snappy;
    compress(buffer: Buffer): Buffer;
    decompress(buffer: Buffer): Buffer;
}
