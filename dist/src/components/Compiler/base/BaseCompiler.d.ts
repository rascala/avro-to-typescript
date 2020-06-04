export interface LogicalTypesConfig {
    className?: string;
    importFrom?: string;
}
export interface CompilerConfig {
    transformName?: (input: string) => string;
    logicalTypes?: LogicalTypesConfig;
}
export declare abstract class BaseCompiler {
    private _schemaPath;
    private _classPath;
    classPath: string;
    schemaPath: string;
    abstract compile(data: string): Promise<object>;
}
