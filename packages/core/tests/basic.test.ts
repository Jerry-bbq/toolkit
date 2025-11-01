import { describe, expect, it } from 'vitest';
import { clamp } from '../src/number/clamp';
import { omit } from '../src/object/omit';
import { pick } from '../src/object/pick';

describe('object.pick/omit', () => {
  it('pick', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(pick(obj, ['a', 'c'] as const)).toEqual({ a: 1, c: 3 });
  });
  it('omit', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(omit(obj, ['b'] as const)).toEqual({ a: 1, c: 3 });
  });
});

describe('number.clamp', () => {
  it('clamp', () => {
    expect(clamp(5, 0, 3)).toBe(3);
    expect(clamp(-1, 0, 3)).toBe(0);
    expect(clamp(2, 0, 3)).toBe(2);
  });
});
