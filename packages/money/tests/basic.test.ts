import { describe, expect, it } from 'vitest';
import {
  toMinor,
  fromMinor,
  roundMoney,
  truncateMoney,
  toFixedMoney,
  formatMoney,
  formatMoneyWithSymbol,
  addMoney,
  subtractMoney,
  multiplyMoney,
  divideMoney,
  compareMoney,
  isMoneyEqual,
  isMoneyGreater,
  isMoneyLess,
  isMoneyGreaterOrEqual,
  isMoneyLessOrEqual,
  isValidAmount,
  getCurrencySymbol,
  getCurrencyName,
} from '../src/index';

describe('Convert', () => {
  describe('toMinor', () => {
    it('should convert major unit to minor unit', () => {
      expect(toMinor(12.34)).toBe(1234);
      expect(toMinor(1.23)).toBe(123);
      expect(toMinor(0.01)).toBe(1);
      expect(toMinor(0)).toBe(0);
    });

    it('should handle custom digits', () => {
      expect(toMinor(1.234, 3)).toBe(1234);
      expect(toMinor(1.2, 1)).toBe(12);
    });

    it('should round correctly', () => {
      expect(toMinor(12.345)).toBe(1235); // 四舍五入
      expect(toMinor(12.344)).toBe(1234);
    });
  });

  describe('fromMinor', () => {
    it('should convert minor unit to major unit', () => {
      expect(fromMinor(1234)).toBe(12.34);
      expect(fromMinor(123)).toBe(1.23);
      expect(fromMinor(1)).toBe(0.01);
      expect(fromMinor(0)).toBe(0);
    });

    it('should handle custom digits', () => {
      expect(fromMinor(1234, 3)).toBe(1.234);
      expect(fromMinor(12, 1)).toBe(1.2);
    });
  });
});

describe('Round', () => {
  describe('roundMoney', () => {
    it('should round money to 2 decimal places by default', () => {
      expect(roundMoney(12.345)).toBe(12.35);
      expect(roundMoney(12.344)).toBe(12.34);
      // 注意：由于浮点数精度，1.005 可能无法精确舍入
      expect(roundMoney(1.005)).toBeCloseTo(1.01, 2);
      expect(roundMoney(1.004)).toBe(1.0);
    });

    it('should handle custom digits', () => {
      expect(roundMoney(12.3456, 3)).toBe(12.346);
      expect(roundMoney(12.3456, 1)).toBe(12.3);
    });

    it('should handle negative numbers', () => {
      // JavaScript 的 Math.round 对于负数 -12.345 会四舍五入到 -12.34
      // 这是因为 -12.345 * 100 = -1234.5，Math.round(-1234.5) = -1234
      expect(roundMoney(-12.345)).toBe(-12.34);
      // 使用 EPSILON 后，-1.005 会正确舍入到 -1.01
      expect(roundMoney(-1.005)).toBe(-1.01);
    });
  });

  describe('truncateMoney', () => {
    it('should truncate money to 2 decimal places by default', () => {
      expect(truncateMoney(12.345)).toBe(12.34);
      expect(truncateMoney(12.999)).toBe(12.99);
      expect(truncateMoney(1.005)).toBe(1.0);
    });

    it('should handle custom digits', () => {
      expect(truncateMoney(12.3456, 3)).toBe(12.345);
      expect(truncateMoney(12.999, 1)).toBe(12.9);
    });
  });

  describe('toFixedMoney', () => {
    it('should format money to fixed decimal places', () => {
      expect(toFixedMoney(12.345)).toBe('12.35');
      expect(toFixedMoney(12.3)).toBe('12.30');
      expect(toFixedMoney(1)).toBe('1.00');
    });

    it('should handle custom digits', () => {
      expect(toFixedMoney(12.3456, 3)).toBe('12.346');
      expect(toFixedMoney(12.3, 1)).toBe('12.3');
    });
  });
});

describe('Format', () => {
  describe('formatMoney', () => {
    it('should format CNY by default', () => {
      const result = formatMoney(12.34);
      expect(result).toContain('12.34');
    });

    it('should format USD', () => {
      const result = formatMoney(12.34, 'USD', 'en-US');
      expect(result).toContain('12.34');
      expect(result).toContain('$');
    });

    it('should format EUR', () => {
      const result = formatMoney(12.34, 'EUR', 'de-DE');
      // de-DE 使用逗号作为小数分隔符
      expect(result).toMatch(/12[.,]34/);
    });
  });

  describe('formatMoneyWithSymbol', () => {
    it('should format with currency symbol', () => {
      expect(formatMoneyWithSymbol(12.34, 'CNY')).toBe('¥12.34');
      expect(formatMoneyWithSymbol(12.34, 'USD')).toBe('$12.34');
      expect(formatMoneyWithSymbol(12.34, 'EUR')).toBe('€12.34');
    });
  });
});

describe('Calculate', () => {
  describe('addMoney', () => {
    it('should add two money amounts', () => {
      expect(addMoney(1.1, 2.2)).toBe(3.3);
      expect(addMoney(0.1, 0.2)).toBe(0.3);
    });

    it('should handle floating point precision', () => {
      expect(addMoney(0.1, 0.2)).toBe(0.3);
      expect(addMoney(1.005, 2.005)).toBe(3.01);
    });
  });

  describe('subtractMoney', () => {
    it('should subtract two money amounts', () => {
      expect(subtractMoney(3.3, 2.2)).toBe(1.1);
      expect(subtractMoney(1.0, 0.1)).toBe(0.9);
    });

    it('should handle negative results', () => {
      expect(subtractMoney(1.0, 2.0)).toBe(-1.0);
    });
  });

  describe('multiplyMoney', () => {
    it('should multiply money amounts', () => {
      expect(multiplyMoney(2.5, 2)).toBe(5.0);
      expect(multiplyMoney(1.11, 3)).toBe(3.33);
    });

    it('should handle decimal multipliers', () => {
      expect(multiplyMoney(10, 0.1)).toBe(1.0);
      expect(multiplyMoney(100, 0.15)).toBe(15.0);
    });
  });

  describe('divideMoney', () => {
    it('should divide money amounts', () => {
      expect(divideMoney(10, 2)).toBe(5.0);
      expect(divideMoney(9, 3)).toBe(3.0);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => divideMoney(10, 0)).toThrow('Division by zero is not allowed');
    });

    it('should handle decimal results', () => {
      expect(divideMoney(1, 3)).toBe(0.33);
      expect(divideMoney(10, 3)).toBe(3.33);
    });
  });
});

describe('Compare', () => {
  describe('compareMoney', () => {
    it('should return -1 when first is less', () => {
      expect(compareMoney(1.0, 2.0)).toBe(-1);
      expect(compareMoney(1.99, 2.0)).toBe(-1);
    });

    it('should return 0 when equal', () => {
      expect(compareMoney(1.0, 1.0)).toBe(0);
      expect(compareMoney(1.23, 1.23)).toBe(0);
    });

    it('should return 1 when first is greater', () => {
      expect(compareMoney(2.0, 1.0)).toBe(1);
      expect(compareMoney(2.01, 2.0)).toBe(1);
    });

    it('should handle floating point precision', () => {
      expect(compareMoney(0.1 + 0.2, 0.3)).toBe(0);
    });
  });

  describe('isMoneyEqual', () => {
    it('should check equality correctly', () => {
      expect(isMoneyEqual(1.0, 1.0)).toBe(true);
      expect(isMoneyEqual(1.23, 1.23)).toBe(true);
      expect(isMoneyEqual(1.0, 2.0)).toBe(false);
    });
  });

  describe('isMoneyGreater', () => {
    it('should check greater than correctly', () => {
      expect(isMoneyGreater(2.0, 1.0)).toBe(true);
      expect(isMoneyGreater(1.0, 2.0)).toBe(false);
      expect(isMoneyGreater(1.0, 1.0)).toBe(false);
    });
  });

  describe('isMoneyLess', () => {
    it('should check less than correctly', () => {
      expect(isMoneyLess(1.0, 2.0)).toBe(true);
      expect(isMoneyLess(2.0, 1.0)).toBe(false);
      expect(isMoneyLess(1.0, 1.0)).toBe(false);
    });
  });

  describe('isMoneyGreaterOrEqual', () => {
    it('should check greater or equal correctly', () => {
      expect(isMoneyGreaterOrEqual(2.0, 1.0)).toBe(true);
      expect(isMoneyGreaterOrEqual(1.0, 1.0)).toBe(true);
      expect(isMoneyGreaterOrEqual(1.0, 2.0)).toBe(false);
    });
  });

  describe('isMoneyLessOrEqual', () => {
    it('should check less or equal correctly', () => {
      expect(isMoneyLessOrEqual(1.0, 2.0)).toBe(true);
      expect(isMoneyLessOrEqual(1.0, 1.0)).toBe(true);
      expect(isMoneyLessOrEqual(2.0, 1.0)).toBe(false);
    });
  });
});

describe('Validate', () => {
  describe('isValidAmount', () => {
    it('should return true for valid amounts', () => {
      expect(isValidAmount(0)).toBe(true);
      expect(isValidAmount(1)).toBe(true);
      expect(isValidAmount(1.23)).toBe(true);
      expect(isValidAmount(1000)).toBe(true);
    });

    it('should return false for invalid amounts', () => {
      expect(isValidAmount(-1)).toBe(false);
      expect(isValidAmount(NaN)).toBe(false);
      expect(isValidAmount(Infinity)).toBe(false);
      expect(isValidAmount(-Infinity)).toBe(false);
      expect(isValidAmount('123')).toBe(false);
      expect(isValidAmount(null)).toBe(false);
      expect(isValidAmount(undefined)).toBe(false);
    });
  });
});

describe('Currency', () => {
  describe('getCurrencySymbol', () => {
    it('should return currency symbols', () => {
      expect(getCurrencySymbol('CNY')).toBe('¥');
      expect(getCurrencySymbol('USD')).toBe('$');
      expect(getCurrencySymbol('EUR')).toBe('€');
      expect(getCurrencySymbol('GBP')).toBe('£');
    });

    it('should handle case insensitive', () => {
      expect(getCurrencySymbol('cny')).toBe('¥');
      expect(getCurrencySymbol('UsD')).toBe('$');
    });

    it('should return uppercase for unknown currencies', () => {
      expect(getCurrencySymbol('XXX')).toBe('XXX');
    });
  });

  describe('getCurrencyName', () => {
    it('should return currency names', () => {
      expect(getCurrencyName('CNY')).toBe('人民币');
      expect(getCurrencyName('USD')).toBe('美元');
      expect(getCurrencyName('EUR')).toBe('欧元');
    });

    it('should handle case insensitive', () => {
      expect(getCurrencyName('cny')).toBe('人民币');
      expect(getCurrencyName('UsD')).toBe('美元');
    });

    it('should return uppercase for unknown currencies', () => {
      expect(getCurrencyName('XXX')).toBe('XXX');
    });
  });
});
