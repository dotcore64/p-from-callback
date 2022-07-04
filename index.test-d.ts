// eslint-disable-next-line import/no-unresolved,n/no-extraneous-import
import fromCallback from 'p-from-callback';
import { expectAssignable, expectType } from 'tsd';

expectType<Promise<'foo'>>(fromCallback((cb) => cb(undefined, 'foo')));
expectAssignable<Promise<string>>(fromCallback((cb) => cb(undefined, 'foo')));
// @ts-expect-error
fromCallback((cb) => cb(undefined, 'foo')) as Promise<number>;
expectType<Promise<'foo'>>(fromCallback<'foo'>((cb) => cb(undefined, 'foo')));

expectAssignable<Promise<string>>(fromCallback((cb) => cb(undefined, 'foo', 'bar')));
expectType<Promise<'foo'>>(fromCallback((cb) => cb(undefined, 'foo', 'bar')));
// @ts-expect-error
fromCallback((cb) => cb(undefined, 'foo', 'bar')) as Promise<'bar'>;
// @ts-expect-error
fromCallback((cb) => cb(undefined, 'foo', 'bar')) as Promise<number>;
expectAssignable<string>(await fromCallback((cb) => cb(undefined, 'foo', 'bar')));
expectAssignable<string[]>(await fromCallback((cb) => cb(undefined, 'foo'), true));
// @ts-expect-error
fromCallback((cb) => cb(undefined, 'foo'), true) as Promise<string>;
// @ts-expect-error
fromCallback((cb) => cb(undefined, 'foo', 'bar')) as Promise<string[]>;
expectAssignable<string[]>(await fromCallback((cb) => cb(undefined, 'foo', 'bar'), true));
// @ts-expect-error
fromCallback((cb) => cb(undefined, 'foo', 'bar'), true) as Promise<number[]>;

expectType<undefined>(await fromCallback((cb) => cb()));
// eslint-disable-next-line unicorn/no-useless-undefined
expectType<undefined>(await fromCallback((cb) => cb(undefined, undefined)));
expectType<undefined>(await fromCallback((cb) => cb(new Error('message'))));
// @ts-expect-error
fromCallback((cb) => cb(new Error('message'), 'foo')) as Promise<undefined>;
// @ts-expect-error
fromCallback((cb) => cb(new Error('message'))) as Promise<number>;

expectType<[]>(await fromCallback((cb) => cb(), true));
expectType<[]>(await fromCallback((cb) => cb('foo'), true));
// @ts-expect-error
fromCallback((cb) => cb(), true) as Promise<undefined>;
// @ts-expect-error
fromCallback((cb) => cb('error'), true) as Promise<undefined>;
// @ts-expect-error
fromCallback((cb) => cb('error', 'foo'), true) as Promise<undefined>;

// @ts-expect-error
fromCallback((cb) => cb === 'foo');

let foo: boolean;
expectAssignable<string>(await fromCallback((cb) => cb(undefined, 'foo', 'bar'), foo));
expectAssignable<string[]>(await fromCallback((cb) => cb(undefined, 'foo', 'bar'), foo));
expectAssignable<string | string[]>(await fromCallback((cb) => cb(undefined, 'foo', 'bar'), foo));
// @ts-expect-error
fromCallback((cb) => cb(undefined, 'foo', 'bar'), foo) as Promise<number>;
// @ts-expect-error
fromCallback((cb) => cb(undefined, 'foo', 'bar'), foo) as Promise<number[]>;
// @ts-expect-error
fromCallback((cb) => cb(undefined, 'foo', 'bar'), foo) as Promise<number | number[]>;
