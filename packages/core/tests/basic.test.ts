import { describe, expect, it, vi } from 'vitest';
import { clamp } from '../src/number/clamp';
import { omit } from '../src/object/omit';
import { pick } from '../src/object/pick';
import {
  uniqBy,
  uniq,
  chunk,
  flatten,
  flattenDeep,
  groupBy,
  sortBy,
  partition,
} from '../src/array';
import {
  camelCase,
  kebabCase,
  snakeCase,
  capitalize,
  capitalizeWords,
  truncate,
} from '../src/string';
import { random, randomFloat, range, lerp, normalize } from '../src/number';
import { throttle, memoize } from '../src/func';
import { keys, values, entries, deepClone } from '../src/object';

describe('object', () => {
  describe('pick/omit', () => {
    it('pick', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(pick(obj, ['a', 'c'] as const)).toEqual({ a: 1, c: 3 });
    });
    it('omit', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(omit(obj, ['b'] as const)).toEqual({ a: 1, c: 3 });
    });
  });

  describe('keys/values/entries', () => {
    it('keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = keys(obj);
      expect(result).toEqual(['a', 'b', 'c']);
    });

    it('values', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = values(obj);
      expect(result).toEqual([1, 2, 3]);
    });

    it('entries', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = entries(obj);
      expect(result).toEqual([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]);
    });
  });

  describe('deepClone', () => {
    it('should deep clone object', () => {
      const original = { a: { b: { c: 1 } } };
      const cloned = deepClone(original);
      cloned.a.b.c = 2;
      expect(original.a.b.c).toBe(1);
      expect(cloned.a.b.c).toBe(2);
    });

    it('should clone array', () => {
      const original = [1, [2, 3]];
      const cloned = deepClone(original);
      (cloned[1] as number[])[0] = 4;
      expect((original[1] as number[])[0]).toBe(2);
      expect((cloned[1] as number[])[0]).toBe(4);
    });

    it('should clone Date', () => {
      const original = new Date('2023-01-01');
      const cloned = deepClone(original);
      cloned.setDate(15);
      expect(original.getDate()).toBe(1);
      expect(cloned.getDate()).toBe(15);
    });

    it('should clone RegExp', () => {
      const original = /test/gi;
      const cloned = deepClone(original);
      expect(cloned.source).toBe('test');
      expect(cloned.flags).toBe('gi');
    });
  });
});

describe('array', () => {
  describe('uniq', () => {
    it('should remove duplicates', () => {
      expect(uniq([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
      expect(uniq(['a', 'b', 'a'])).toEqual(['a', 'b']);
    });
  });

  describe('chunk', () => {
    it('should chunk array', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
      expect(chunk([1, 2, 3, 4], 2)).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });
  });

  describe('flatten', () => {
    it('should flatten array one level', () => {
      expect(flatten([1, [2, 3], [4, 5]])).toEqual([1, 2, 3, 4, 5]);
    });

    it('should deep flatten array', () => {
      expect(flattenDeep([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
    });
  });

  describe('groupBy', () => {
    it('should group by key', () => {
      const arr = [
        { id: 1, type: 'a' },
        { id: 2, type: 'b' },
        { id: 3, type: 'a' },
      ];
      const result = groupBy(arr, (x) => x.type);
      expect(result.a).toHaveLength(2);
      expect(result.b).toHaveLength(1);
    });
  });

  describe('sortBy', () => {
    it('should sort by key ascending', () => {
      const arr = [{ age: 30 }, { age: 20 }, { age: 40 }];
      const result = sortBy(arr, (x) => x.age, 'asc');
      expect(result[0].age).toBe(20);
      expect(result[2].age).toBe(40);
    });

    it('should sort by key descending', () => {
      const arr = [{ age: 30 }, { age: 20 }, { age: 40 }];
      const result = sortBy(arr, (x) => x.age, 'desc');
      expect(result[0].age).toBe(40);
      expect(result[2].age).toBe(20);
    });
  });

  describe('partition', () => {
    it('should partition array', () => {
      const arr = [1, 2, 3, 4, 5];
      const [even, odd] = partition(arr, (x) => x % 2 === 0);
      expect(even).toEqual([2, 4]);
      expect(odd).toEqual([1, 3, 5]);
    });
  });
});

describe('string', () => {
  describe('camelCase', () => {
    it('should convert to camelCase', () => {
      expect(camelCase('hello world')).toBe('helloWorld');
      expect(camelCase('hello-world')).toBe('helloWorld');
      expect(camelCase('hello_world')).toBe('helloWorld');
    });
  });

  describe('kebabCase', () => {
    it('should convert to kebab-case', () => {
      expect(kebabCase('helloWorld')).toBe('hello-world');
      expect(kebabCase('hello world')).toBe('hello-world');
      expect(kebabCase('hello_world')).toBe('hello-world');
    });
  });

  describe('snakeCase', () => {
    it('should convert to snake_case', () => {
      expect(snakeCase('helloWorld')).toBe('hello_world');
      expect(snakeCase('hello-world')).toBe('hello_world');
      expect(snakeCase('hello world')).toBe('hello_world');
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('HELLO')).toBe('Hello');
    });

    it('should capitalize words', () => {
      expect(capitalizeWords('hello world')).toBe('Hello World');
    });
  });

  describe('truncate', () => {
    it('should truncate string', () => {
      expect(truncate('hello world', 8)).toBe('hello...');
      expect(truncate('hello', 10)).toBe('hello');
    });
  });
});

describe('number', () => {
  describe('clamp', () => {
    it('clamp', () => {
      expect(clamp(5, 0, 3)).toBe(3);
      expect(clamp(-1, 0, 3)).toBe(0);
      expect(clamp(2, 0, 3)).toBe(2);
    });
  });

  describe('random', () => {
    it('should generate random integer', () => {
      const result = random(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
      expect(Number.isInteger(result)).toBe(true);
    });

    it('should generate random float', () => {
      const result = randomFloat(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThan(10);
    });
  });

  describe('range', () => {
    it('should generate range', () => {
      expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
      expect(range(0, 5, 2)).toEqual([0, 2, 4]);
      expect(range(5, 0, -1)).toEqual([5, 4, 3, 2, 1]);
    });
  });

  describe('lerp', () => {
    it('should interpolate', () => {
      expect(lerp(0, 10, 0.5)).toBe(5);
      expect(lerp(0, 10, 0)).toBe(0);
      expect(lerp(0, 10, 1)).toBe(10);
    });
  });

  describe('normalize', () => {
    it('should normalize value', () => {
      expect(normalize(5, 0, 10)).toBe(0.5);
      expect(normalize(0, 0, 10)).toBe(0);
      expect(normalize(10, 0, 10)).toBe(1);
    });
  });
});

describe('func', () => {
  describe('throttle', () => {
    it('should throttle function calls', async () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 100);
      throttled();
      throttled();
      throttled();
      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(fn).toHaveBeenCalledTimes(2); // First call + one after delay
    });
  });

  describe('memoize', () => {
    it('should memoize function results', () => {
      let callCount = 0;
      const fn = (x: number): number => {
        callCount++;
        return x * 2;
      };
      const memoized = memoize(fn);
      expect(memoized(5)).toBe(10);
      expect(memoized(5)).toBe(10);
      expect(callCount).toBe(1);
    });

    it('should use custom keyer', () => {
      let callCount = 0;
      const fn = (a: number, b: number): number => {
        callCount++;
        return a + b;
      };
      const memoized = memoize(fn, (a, b) => `${a}-${b}`);
      expect(memoized(1, 2)).toBe(3);
      expect(memoized(1, 2)).toBe(3);
      expect(callCount).toBe(1);
    });
  });
});
