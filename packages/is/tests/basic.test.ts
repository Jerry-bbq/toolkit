import { describe, expect, it } from 'vitest';
import {
  isDefined,
  isUndefined,
  isNil,
  isNull,
  isEmpty,
  isEqual,
  isInstance,
  isType,
  isArguments,
  isArgumentsEmpty,
  isArray,
  isArrayEmpty,
  isArrayLike,
  isBoolean,
  isTrue,
  isFalse,
  isDate,
  isElement,
  isError,
  isFunction,
  isNumber,
  isInteger,
  isDecimal,
  isInfinite,
  isNaNValue,
  isEven,
  isOdd,
  isDivisibleBy,
  isMaximum,
  isMinimum,
  isGreaterThan,
  isLessThan,
  isGreaterThanOrEqual,
  isLessThanOrEqual,
  isWithin,
  isObject,
  isRegExp,
  isString,
  isBase64,
  isHex,
  isSymbol,
  isBigInt,
} from '../src/index';

describe('General', () => {
  describe('isDefined', () => {
    it('should return true for defined values', () => {
      expect(isDefined(0)).toBe(true);
      expect(isDefined('')).toBe(true);
      expect(isDefined(null)).toBe(true);
      expect(isDefined(false)).toBe(true);
    });

    it('should return false for undefined', () => {
      expect(isDefined(undefined)).toBe(false);
    });
  });

  describe('isUndefined', () => {
    it('should return true for undefined', () => {
      expect(isUndefined(undefined)).toBe(true);
    });

    it('should return false for defined values', () => {
      expect(isUndefined(null)).toBe(false);
      expect(isUndefined(0)).toBe(false);
    });
  });

  describe('isNil', () => {
    it('should return true for null and undefined', () => {
      expect(isNil(null)).toBe(true);
      expect(isNil(undefined)).toBe(true);
    });

    it('should return false for other values', () => {
      expect(isNil(0)).toBe(false);
      expect(isNil('')).toBe(false);
    });
  });

  describe('isNull', () => {
    it('should return true for null', () => {
      expect(isNull(null)).toBe(true);
    });

    it('should return false for other values', () => {
      expect(isNull(undefined)).toBe(false);
      expect(isNull(0)).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('should return true for empty values', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty('')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
    });

    it('should return false for non-empty values', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty([1])).toBe(false);
      expect(isEmpty({ a: 1 })).toBe(false);
    });
  });

  describe('isEqual', () => {
    it('should return true for equal primitive values', () => {
      expect(isEqual(1, 1)).toBe(true);
      expect(isEqual('hello', 'hello')).toBe(true);
      expect(isEqual(true, true)).toBe(true);
    });

    it('should return true for equal arrays', () => {
      expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(isEqual([], [])).toBe(true);
    });

    it('should return true for equal objects', () => {
      expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
      expect(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
    });

    it('should return false for different values', () => {
      expect(isEqual(1, 2)).toBe(false);
      expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
      expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
    });

    it('should handle NaN comparison', () => {
      expect(isEqual(NaN, NaN)).toBe(true);
    });

    it('should handle Date comparison', () => {
      const date1 = new Date('2023-01-01');
      const date2 = new Date('2023-01-01');
      expect(isEqual(date1, date2)).toBe(true);
    });
  });

  describe('isInstance', () => {
    it('should return true for instances', () => {
      expect(isInstance(new Date(), Date)).toBe(true);
      expect(isInstance([], Array)).toBe(true);
      expect(isInstance(/test/, RegExp)).toBe(true);
    });

    it('should return false for non-instances', () => {
      expect(isInstance({}, Date)).toBe(false);
      expect(isInstance('hello', Array)).toBe(false);
    });
  });

  describe('isType', () => {
    it('should check types correctly', () => {
      expect(isType('hello', 'string')).toBe(true);
      expect(isType(123, 'number')).toBe(true);
      expect(isType(true, 'boolean')).toBe(true);
      expect(isType(() => {}, 'function')).toBe(true);
      expect(isType({}, 'object')).toBe(true);
      expect(isType(undefined, 'undefined')).toBe(true);
      expect(isType(Symbol('test'), 'symbol')).toBe(true);
    });
  });
});

describe('Arguments', () => {
  function testFunction(...args: unknown[]): IArguments {
    return arguments;
  }

  it('should detect arguments object', () => {
    const args = testFunction(1, 2, 3);
    expect(isArguments(args)).toBe(true);
  });

  it('should return false for non-arguments', () => {
    expect(isArguments([])).toBe(false);
    expect(isArguments({})).toBe(false);
  });

  it('should check if arguments is empty', () => {
    const emptyArgs = testFunction();
    const nonEmptyArgs = testFunction(1, 2);
    expect(isArgumentsEmpty(emptyArgs)).toBe(true);
    expect(isArgumentsEmpty(nonEmptyArgs)).toBe(false);
  });
});

describe('Array', () => {
  describe('isArray', () => {
    it('should return true for arrays', () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
    });

    it('should return false for non-arrays', () => {
      expect(isArray({})).toBe(false);
      expect(isArray('hello')).toBe(false);
    });
  });

  describe('isArrayEmpty', () => {
    it('should return true for empty arrays', () => {
      expect(isArrayEmpty([])).toBe(true);
    });

    it('should return false for non-empty arrays', () => {
      expect(isArrayEmpty([1])).toBe(false);
    });
  });

  describe('isArrayLike', () => {
    it('should return true for array-like objects', () => {
      expect(isArrayLike('hello')).toBe(true);
      expect(isArrayLike({ length: 5 })).toBe(true);
    });

    it('should return false for non-array-like', () => {
      expect(isArrayLike({})).toBe(false);
      expect(isArrayLike(null)).toBe(false);
    });
  });
});

describe('Boolean', () => {
  describe('isBoolean', () => {
    it('should return true for booleans', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
    });

    it('should return false for non-booleans', () => {
      expect(isBoolean(0)).toBe(false);
      expect(isBoolean('true')).toBe(false);
    });
  });

  describe('isTrue', () => {
    it('should return true only for true', () => {
      expect(isTrue(true)).toBe(true);
      expect(isTrue(false)).toBe(false);
      expect(isTrue(1)).toBe(false);
    });
  });

  describe('isFalse', () => {
    it('should return true only for false', () => {
      expect(isFalse(false)).toBe(true);
      expect(isFalse(true)).toBe(false);
      expect(isFalse(0)).toBe(false);
    });
  });
});

describe('Date', () => {
  describe('isDate', () => {
    it('should return true for valid dates', () => {
      expect(isDate(new Date())).toBe(true);
      expect(isDate(new Date('2023-01-01'))).toBe(true);
    });

    it('should return false for invalid dates', () => {
      expect(isDate(new Date('invalid'))).toBe(false);
      expect(isDate({})).toBe(false);
    });
  });
});

describe('Element', () => {
  describe('isElement', () => {
    it('should work in browser environment', () => {
      // 在 Node.js 环境中返回 false
      expect(isElement({})).toBe(false);
      expect(isElement(null)).toBe(false);
    });
  });
});

describe('Error', () => {
  describe('isError', () => {
    it('should return true for Error objects', () => {
      expect(isError(new Error())).toBe(true);
      expect(isError(new TypeError())).toBe(true);
    });

    it('should return false for non-errors', () => {
      expect(isError({})).toBe(false);
      expect(isError('error')).toBe(false);
    });
  });
});

describe('Function', () => {
  describe('isFunction', () => {
    it('should return true for functions', () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(function () {})).toBe(true);
      expect(isFunction(async () => {})).toBe(true);
    });

    it('should return false for non-functions', () => {
      expect(isFunction({})).toBe(false);
      expect(isFunction('function')).toBe(false);
    });
  });
});

describe('Number', () => {
  describe('isNumber', () => {
    it('should return true for numbers', () => {
      expect(isNumber(0)).toBe(true);
      expect(isNumber(123)).toBe(true);
      expect(isNumber(-123)).toBe(true);
      expect(isNumber(1.23)).toBe(true);
    });

    it('should return false for NaN', () => {
      expect(isNumber(NaN)).toBe(false);
    });
  });

  describe('isInteger', () => {
    it('should return true for integers', () => {
      expect(isInteger(0)).toBe(true);
      expect(isInteger(123)).toBe(true);
      expect(isInteger(-123)).toBe(true);
    });

    it('should return false for decimals', () => {
      expect(isInteger(1.23)).toBe(false);
    });
  });

  describe('isDecimal', () => {
    it('should return true for decimals', () => {
      expect(isDecimal(1.23)).toBe(true);
      expect(isDecimal(-1.23)).toBe(true);
    });

    it('should return false for integers', () => {
      expect(isDecimal(123)).toBe(false);
    });
  });

  describe('isInfinite', () => {
    it('should return true for Infinity', () => {
      expect(isInfinite(Infinity)).toBe(true);
      expect(isInfinite(-Infinity)).toBe(true);
    });

    it('should return false for finite numbers', () => {
      expect(isInfinite(123)).toBe(false);
    });
  });

  describe('isNaNValue', () => {
    it('should return true for NaN', () => {
      expect(isNaNValue(NaN)).toBe(true);
    });

    it('should return false for non-NaN', () => {
      expect(isNaNValue(123)).toBe(false);
    });
  });

  describe('isEven', () => {
    it('should return true for even numbers', () => {
      expect(isEven(2)).toBe(true);
      expect(isEven(0)).toBe(true);
      expect(isEven(-2)).toBe(true);
    });

    it('should return false for odd numbers', () => {
      expect(isEven(1)).toBe(false);
      expect(isEven(3)).toBe(false);
    });
  });

  describe('isOdd', () => {
    it('should return true for odd numbers', () => {
      expect(isOdd(1)).toBe(true);
      expect(isOdd(3)).toBe(true);
      expect(isOdd(-1)).toBe(true);
    });

    it('should return false for even numbers', () => {
      expect(isOdd(2)).toBe(false);
      expect(isOdd(0)).toBe(false);
    });
  });

  describe('isDivisibleBy', () => {
    it('should check divisibility', () => {
      expect(isDivisibleBy(10, 2)).toBe(true);
      expect(isDivisibleBy(10, 5)).toBe(true);
      expect(isDivisibleBy(10, 3)).toBe(false);
    });
  });

  describe('Comparison functions', () => {
    it('isGreaterThan', () => {
      expect(isGreaterThan(5, 3)).toBe(true);
      expect(isGreaterThan(3, 5)).toBe(false);
    });

    it('isLessThan', () => {
      expect(isLessThan(3, 5)).toBe(true);
      expect(isLessThan(5, 3)).toBe(false);
    });

    it('isGreaterThanOrEqual', () => {
      expect(isGreaterThanOrEqual(5, 5)).toBe(true);
      expect(isGreaterThanOrEqual(5, 3)).toBe(true);
      expect(isGreaterThanOrEqual(3, 5)).toBe(false);
    });

    it('isLessThanOrEqual', () => {
      expect(isLessThanOrEqual(3, 3)).toBe(true);
      expect(isLessThanOrEqual(3, 5)).toBe(true);
      expect(isLessThanOrEqual(5, 3)).toBe(false);
    });
  });

  describe('isMaximum', () => {
    it('should find maximum value', () => {
      expect(isMaximum(5, [1, 2, 3, 4, 5])).toBe(true);
      expect(isMaximum(3, [1, 2, 3, 4, 5])).toBe(false);
    });
  });

  describe('isMinimum', () => {
    it('should find minimum value', () => {
      expect(isMinimum(1, [1, 2, 3, 4, 5])).toBe(true);
      expect(isMinimum(3, [1, 2, 3, 4, 5])).toBe(false);
    });
  });

  describe('isWithin', () => {
    it('should check if value is within range', () => {
      expect(isWithin(5, 1, 10)).toBe(true);
      expect(isWithin(1, 1, 10)).toBe(true);
      expect(isWithin(10, 1, 10)).toBe(true);
      expect(isWithin(0, 1, 10)).toBe(false);
      expect(isWithin(11, 1, 10)).toBe(false);
    });
  });
});

describe('Object', () => {
  describe('isObject', () => {
    it('should return true for objects', () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ a: 1 })).toBe(true);
    });

    it('should return false for non-objects', () => {
      expect(isObject(null)).toBe(false);
      expect(isObject([])).toBe(false);
      expect(isObject('hello')).toBe(false);
    });
  });
});

describe('RegExp', () => {
  describe('isRegExp', () => {
    it('should return true for RegExp objects', () => {
      expect(isRegExp(/test/)).toBe(true);
      expect(isRegExp(new RegExp('test'))).toBe(true);
    });

    it('should return false for non-regexp', () => {
      expect(isRegExp('test')).toBe(false);
      expect(isRegExp({})).toBe(false);
    });
  });
});

describe('String', () => {
  describe('isString', () => {
    it('should return true for strings', () => {
      expect(isString('hello')).toBe(true);
      expect(isString('')).toBe(true);
    });

    it('should return false for non-strings', () => {
      expect(isString(123)).toBe(false);
      expect(isString(null)).toBe(false);
    });
  });
});

describe('Encoded', () => {
  describe('isBase64', () => {
    it('should return true for valid Base64 strings', () => {
      expect(isBase64('SGVsbG8=')).toBe(true);
      expect(isBase64('SGVsbG8gV29ybGQ=')).toBe(true);
    });

    it('should return false for invalid Base64 strings', () => {
      expect(isBase64('Hello')).toBe(false);
      expect(isBase64('Hello!')).toBe(false);
      expect(isBase64('')).toBe(false);
    });
  });

  describe('isHex', () => {
    it('should return true for valid hex strings', () => {
      expect(isHex('123abc')).toBe(true);
      expect(isHex('ABCDEF')).toBe(true);
      expect(isHex('123')).toBe(true);
    });

    it('should return false for invalid hex strings', () => {
      expect(isHex('hello')).toBe(false);
      expect(isHex('123g')).toBe(false);
    });
  });
});

describe('Symbol', () => {
  describe('isSymbol', () => {
    it('should return true for symbols', () => {
      expect(isSymbol(Symbol('test'))).toBe(true);
      expect(isSymbol(Symbol.iterator)).toBe(true);
    });

    it('should return false for non-symbols', () => {
      expect(isSymbol('test')).toBe(false);
      expect(isSymbol({})).toBe(false);
    });
  });
});

describe('BigInt', () => {
  describe('isBigInt', () => {
    it('should return true for BigInt', () => {
      expect(isBigInt(BigInt(123))).toBe(true);
      expect(isBigInt(123n)).toBe(true);
    });

    it('should return false for non-BigInt', () => {
      expect(isBigInt(123)).toBe(false);
      expect(isBigInt('123')).toBe(false);
    });
  });
});
