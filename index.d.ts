declare function fromCallback<R, M extends boolean = false>(
    // fn: (callback: (error?: any, ...result: R[]) => unknown) => unknown,
    fn: (callback: (error?: any, ...result: M extends false ? [R, ...any[]] : R[]) => unknown) => unknown,
    multi?: M,
): Promise<M extends true ? R[] : R>;

export default fromCallback;
