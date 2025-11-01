// General
export { isDefined, isUndefined, isNil, isNull } from './general';
export { isEmpty } from './empty';
export { isEqual } from './equal';
export { isInstance } from './instance';
export { isType } from './type';
export { isHosted } from './hosted';

// Arguments
export { isArguments, isArgumentsEmpty } from './arguments';

// Array
export { isArray, isArrayEmpty, isArrayLike } from './array';

// Boolean
export { isBoolean, isTrue, isFalse } from './boolean';

// Date
export { isDate } from './date';

// Element (Browser)
export { isElement } from './element';

// Error
export { isError } from './error';

// Function
export { isFunction } from './function';

// Number
export {
  isNumber,
  isInteger,
  isDecimal,
  isInfinite,
  isNaN as isNaNValue,
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
} from './number';

// Object
export { isObject } from './object';

// RegExp
export { isRegExp } from './regexp';

// String
export { isString } from './string';

// Encoded
export { isBase64, isHex } from './encoded';

// Symbol
export { isSymbol } from './symbol';

// BigInt
export { isBigInt } from './bigint';
