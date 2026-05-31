type Result<R, M extends boolean> =
    R extends undefined
        ? M extends true
            ? [never, ...never[]] // Should be CompilerError<>
            : [] | [undefined]
        : M extends false
            ? [R, ...unknown[]]
            : R extends unknown[]
                ? R
                : [never, ...never[]]; // Should be CompilerError<>

declare function fromCallback<R, M extends boolean = false>(
    fn: (callback: (error?: unknown, ...result: Result<R, M>) => unknown) => unknown,
    multi?: M,
): Promise<R>;

export default fromCallback;
