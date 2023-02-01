import { expect } from 'chai';

// https://github.com/import-js/eslint-plugin-import/issues/1649
import fromCallback from 'p-from-callback';

describe('p-from-callback', () => {
  it('should resolve with 1 argument', () => expect(
    fromCallback((callback) => callback(undefined, 'foo')),
  ).to.become('foo'));

  it('should resolve with 1 argument when callback has multiple', () => expect(
    fromCallback((callback) => callback(undefined, 'foo', 'bar')),
  ).to.become('foo'));

  it('should resolve with multiple arguments', () => expect(
    fromCallback((callback) => callback(undefined, 'foo', 'bar'), true),
  ).to.become(['foo', 'bar']));

  it('should resolve to a single element array', () => expect(
    fromCallback((callback) => callback(undefined, 'foo'), true),
  ).to.become(['foo']));

  it('should resolve to undefined', () => expect(
    fromCallback((callback) => callback()),
  ).to.become());

  it('should resolve to an empty array', () => expect(
    fromCallback((callback) => callback(), true),
  ).to.become([]));

  it('should be rejected', () => expect(
    fromCallback((callback) => callback(new Error('my error'))),
  ).to.be.rejectedWith(Error, 'my error'));
});
