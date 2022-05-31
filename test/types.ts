// eslint-disable-next-line import/no-unresolved,n/no-extraneous-import
import fromCallback from 'p-from-callback';

fromCallback((cb) => cb(undefined, 'foo')) as Promise<'foo'>;
fromCallback((cb) => cb(undefined, 'foo')) as Promise<string>;
// @ts-expect-error
fromCallback((cb) => cb(undefined, 'foo')) as Promise<number>;
fromCallback<'foo'>((cb) => cb(undefined, 'foo')) as Promise<'foo'>;

fromCallback((cb) => cb(undefined, 'foo', 'bar')) as Promise<string>;
fromCallback((cb) => cb(undefined, 'foo', 'bar')) as Promise<'foo'>;
// @ts-expect-error
fromCallback((cb) => cb(undefined, 'foo', 'bar')) as Promise<'bar'>;
// @ts-expect-error
fromCallback((cb) => cb(undefined, 'foo', 'bar')) as Promise<number>;
fromCallback((cb) => cb(undefined, 'foo', 'bar')) as Promise<string>;
fromCallback((cb) => cb(undefined, 'foo'), true) as Promise<string[]>;
// @ts-expect-error
fromCallback((cb) => cb(undefined, 'foo'), true) as Promise<string>;
// @ts-expect-error
fromCallback((cb) => cb(undefined, 'foo', 'bar')) as Promise<string[]>;
fromCallback((cb) => cb(undefined, 'foo', 'bar'), true) as Promise<string[]>;
// @ts-expect-error
fromCallback((cb) => cb(undefined, 'foo', 'bar'), true) as Promise<number[]>;

fromCallback((cb) => cb()) as Promise<undefined>;
// eslint-disable-next-line unicorn/no-useless-undefined
fromCallback((cb) => cb(undefined, undefined)) as Promise<undefined>;
fromCallback((cb) => cb(new Error('message'))) as Promise<undefined>;
// @ts-expect-error
fromCallback((cb) => cb(new Error('message'), 'foo')) as Promise<undefined>;
// @ts-expect-error
fromCallback((cb) => cb(new Error('message'))) as Promise<number>;

fromCallback((cb) => cb(), true) as Promise<[]>;
fromCallback((cb) => cb('foo'), true) as Promise<[]>;
// @ts-expect-error
fromCallback((cb) => cb(), true) as Promise<undefined>;
// @ts-expect-error
fromCallback((cb) => cb('error'), true) as Promise<undefined>;
// @ts-expect-error
fromCallback((cb) => cb('error', 'foo'), true) as Promise<undefined>;

// @ts-expect-error
fromCallback((cb) => cb === 'foo');

let foo: boolean;
fromCallback((cb) => cb(undefined, 'foo', 'bar'), foo) as Promise<string>;
fromCallback((cb) => cb(undefined, 'foo', 'bar'), foo) as Promise<string[]>;
fromCallback((cb) => cb(undefined, 'foo', 'bar'), foo) as Promise<string | string[]>;
// @ts-expect-error
fromCallback((cb) => cb(undefined, 'foo', 'bar'), foo) as Promise<number>;
// @ts-expect-error
fromCallback((cb) => cb(undefined, 'foo', 'bar'), foo) as Promise<number[]>;
// @ts-expect-error
fromCallback((cb) => cb(undefined, 'foo', 'bar'), foo) as Promise<number | number[]>;
