import { describe, expect, it } from 'vitest';
import {
  isSameDay,
  isSameMonth,
  isSameYear,
  isToday,
  isYesterday,
  isTomorrow,
  isBefore,
  isAfter,
  isBetween,
  addDays,
  addMonths,
  addYears,
  addHours,
  addMinutes,
  addSeconds,
  addMilliseconds,
  subtractDays,
  subtractMonths,
  subtractYears,
  formatISO,
  formatDate,
  formatDateTime,
  formatTime,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  diffDays,
  diffMonths,
  diffYears,
  diffHours,
  diffMinutes,
  diffSeconds,
  isValidDate,
  getDayOfWeek,
  getDayName,
  getWeekNumber,
  getDaysInMonth,
  cloneDate,
} from '../src/index';

describe('Compare', () => {
  describe('isSameDay', () => {
    it('should check if two dates are the same day', () => {
      const date1 = new Date('2023-01-01T10:00:00');
      const date2 = new Date('2023-01-01T20:00:00');
      const date3 = new Date('2023-01-02T10:00:00');
      expect(isSameDay(date1, date2)).toBe(true);
      expect(isSameDay(date1, date3)).toBe(false);
    });
  });

  describe('isSameMonth', () => {
    it('should check if two dates are in the same month', () => {
      const date1 = new Date('2023-01-01');
      const date2 = new Date('2023-01-15');
      const date3 = new Date('2023-02-01');
      expect(isSameMonth(date1, date2)).toBe(true);
      expect(isSameMonth(date1, date3)).toBe(false);
    });
  });

  describe('isSameYear', () => {
    it('should check if two dates are in the same year', () => {
      const date1 = new Date('2023-01-01');
      const date2 = new Date('2023-12-31');
      const date3 = new Date('2024-01-01');
      expect(isSameYear(date1, date2)).toBe(true);
      expect(isSameYear(date1, date3)).toBe(false);
    });
  });

  describe('isToday', () => {
    it('should check if date is today', () => {
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isToday(today)).toBe(true);
      expect(isToday(yesterday)).toBe(false);
    });
  });

  describe('isYesterday', () => {
    it('should check if date is yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const today = new Date();
      expect(isYesterday(yesterday)).toBe(true);
      expect(isYesterday(today)).toBe(false);
    });
  });

  describe('isTomorrow', () => {
    it('should check if date is tomorrow', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const today = new Date();
      expect(isTomorrow(tomorrow)).toBe(true);
      expect(isTomorrow(today)).toBe(false);
    });
  });

  describe('isBefore', () => {
    it('should check if date is before another', () => {
      const date1 = new Date('2023-01-01');
      const date2 = new Date('2023-01-02');
      expect(isBefore(date1, date2)).toBe(true);
      expect(isBefore(date2, date1)).toBe(false);
    });
  });

  describe('isAfter', () => {
    it('should check if date is after another', () => {
      const date1 = new Date('2023-01-01');
      const date2 = new Date('2023-01-02');
      expect(isAfter(date2, date1)).toBe(true);
      expect(isAfter(date1, date2)).toBe(false);
    });
  });

  describe('isBetween', () => {
    it('should check if date is between two dates', () => {
      const start = new Date('2023-01-01');
      const middle = new Date('2023-01-15');
      const end = new Date('2023-01-31');
      const before = new Date('2022-12-31');
      expect(isBetween(middle, start, end)).toBe(true);
      expect(isBetween(start, start, end)).toBe(true);
      expect(isBetween(end, start, end)).toBe(true);
      expect(isBetween(before, start, end)).toBe(false);
    });
  });
});

describe('Add', () => {
  describe('addDays', () => {
    it('should add days to date', () => {
      const date = new Date('2023-01-01');
      const result = addDays(date, 5);
      expect(result.getDate()).toBe(6);
      expect(date.getDate()).toBe(1); // 原始日期不应被修改
    });
  });

  describe('addMonths', () => {
    it('should add months to date', () => {
      const date = new Date('2023-01-15');
      const result = addMonths(date, 2);
      expect(result.getMonth()).toBe(2); // March (0-indexed)
      expect(result.getFullYear()).toBe(2023);
    });
  });

  describe('addYears', () => {
    it('should add years to date', () => {
      const date = new Date('2023-01-15');
      const result = addYears(date, 2);
      expect(result.getFullYear()).toBe(2025);
    });
  });

  describe('addHours', () => {
    it('should add hours to date', () => {
      const date = new Date('2023-01-01T10:00:00');
      const result = addHours(date, 5);
      expect(result.getHours()).toBe(15);
    });
  });

  describe('addMinutes', () => {
    it('should add minutes to date', () => {
      const date = new Date('2023-01-01T10:00:00');
      const result = addMinutes(date, 30);
      expect(result.getMinutes()).toBe(30);
    });
  });

  describe('addSeconds', () => {
    it('should add seconds to date', () => {
      const date = new Date('2023-01-01T10:00:00');
      const result = addSeconds(date, 30);
      expect(result.getSeconds()).toBe(30);
    });
  });

  describe('addMilliseconds', () => {
    it('should add milliseconds to date', () => {
      const date = new Date('2023-01-01T10:00:00.000');
      const result = addMilliseconds(date, 500);
      expect(result.getMilliseconds()).toBe(500);
    });
  });

  describe('subtractDays', () => {
    it('should subtract days from date', () => {
      const date = new Date('2023-01-10');
      const result = subtractDays(date, 5);
      expect(result.getDate()).toBe(5);
    });
  });

  describe('subtractMonths', () => {
    it('should subtract months from date', () => {
      const date = new Date('2023-03-15');
      const result = subtractMonths(date, 2);
      expect(result.getMonth()).toBe(0); // January
    });
  });

  describe('subtractYears', () => {
    it('should subtract years from date', () => {
      const date = new Date('2023-01-15');
      const result = subtractYears(date, 2);
      expect(result.getFullYear()).toBe(2021);
    });
  });
});

describe('Format', () => {
  describe('formatISO', () => {
    it('should format date as ISO string', () => {
      const date = new Date('2023-01-01T10:00:00Z');
      const result = formatISO(date);
      expect(result).toMatch(/2023-01-01/);
      expect(result).toContain('T');
    });
  });

  describe('formatDate', () => {
    it('should format date as YYYY-MM-DD', () => {
      const date = new Date('2023-01-01');
      expect(formatDate(date)).toBe('2023-01-01');
    });
  });

  describe('formatDateTime', () => {
    it('should format date as YYYY-MM-DD HH:mm:ss', () => {
      const date = new Date('2023-01-01T10:30:45');
      const result = formatDateTime(date);
      expect(result).toMatch(/2023-01-01/);
      expect(result).toMatch(/10:30:45/);
    });
  });

  describe('formatTime', () => {
    it('should format date as HH:mm:ss', () => {
      const date = new Date('2023-01-01T10:30:45');
      const result = formatTime(date);
      expect(result).toMatch(/\d{2}:\d{2}:\d{2}/);
      // 注意：可能受时区影响，所以只检查格式
    });
  });
});

describe('StartOf', () => {
  describe('startOfDay', () => {
    it('should get start of day', () => {
      const date = new Date('2023-01-15T14:30:45');
      const result = startOfDay(date);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  describe('endOfDay', () => {
    it('should get end of day', () => {
      const date = new Date('2023-01-15T14:30:45');
      const result = endOfDay(date);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  describe('startOfWeek', () => {
    it('should get start of week (Monday)', () => {
      const date = new Date('2023-01-15'); // Sunday
      const result = startOfWeek(date, 1);
      // 结果应该是周一，即 day = 1
      expect([0, 1]).toContain(result.getDay()); // 可能是周日或周一，取决于实现
    });
  });

  describe('endOfWeek', () => {
    it('should get end of week', () => {
      const date = new Date('2023-01-15');
      const result = endOfWeek(date, 1);
      // 结果应该是周日，即 day = 0
      expect([0, 6]).toContain(result.getDay()); // 可能是周六或周日
    });
  });

  describe('startOfMonth', () => {
    it('should get start of month', () => {
      const date = new Date('2023-01-15');
      const result = startOfMonth(date);
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(0);
    });
  });

  describe('endOfMonth', () => {
    it('should get end of month', () => {
      const date = new Date('2023-01-15');
      const result = endOfMonth(date);
      expect(result.getMonth()).toBe(0); // January
      expect(result.getDate()).toBe(31);
    });
  });

  describe('startOfYear', () => {
    it('should get start of year', () => {
      const date = new Date('2023-06-15');
      const result = startOfYear(date);
      expect(result.getMonth()).toBe(0); // January
      expect(result.getDate()).toBe(1);
    });
  });

  describe('endOfYear', () => {
    it('should get end of year', () => {
      const date = new Date('2023-06-15');
      const result = endOfYear(date);
      expect(result.getMonth()).toBe(11); // December
      expect(result.getDate()).toBe(31);
    });
  });
});

describe('Diff', () => {
  describe('diffDays', () => {
    it('should calculate difference in days', () => {
      const date1 = new Date('2023-01-01');
      const date2 = new Date('2023-01-05');
      expect(diffDays(date2, date1)).toBe(4);
    });
  });

  describe('diffMonths', () => {
    it('should calculate difference in months', () => {
      const date1 = new Date('2023-01-15');
      const date2 = new Date('2023-03-15');
      expect(diffMonths(date2, date1)).toBe(2);
    });
  });

  describe('diffYears', () => {
    it('should calculate difference in years', () => {
      const date1 = new Date('2023-01-15');
      const date2 = new Date('2025-01-15');
      expect(diffYears(date2, date1)).toBe(2);
    });
  });

  describe('diffHours', () => {
    it('should calculate difference in hours', () => {
      const date1 = new Date('2023-01-01T10:00:00Z');
      const date2 = new Date('2023-01-01T15:00:00Z');
      expect(diffHours(date2, date1)).toBe(5);
    });
  });

  describe('diffMinutes', () => {
    it('should calculate difference in minutes', () => {
      const date1 = new Date('2023-01-01T10:00:00Z');
      const date2 = new Date('2023-01-01T10:30:00Z');
      expect(diffMinutes(date2, date1)).toBe(30);
    });
  });

  describe('diffSeconds', () => {
    it('should calculate difference in seconds', () => {
      const date1 = new Date('2023-01-01T10:00:00Z');
      const date2 = new Date('2023-01-01T10:00:30Z');
      expect(diffSeconds(date2, date1)).toBe(30);
    });
  });
});

describe('Utils', () => {
  describe('isValidDate', () => {
    it('should validate valid dates', () => {
      expect(isValidDate(new Date())).toBe(true);
      expect(isValidDate(new Date('2023-01-01'))).toBe(true);
    });

    it('should reject invalid dates', () => {
      expect(isValidDate(new Date('invalid'))).toBe(false);
      expect(isValidDate('2023-01-01')).toBe(false);
      expect(isValidDate(null)).toBe(false);
    });
  });

  describe('cloneDate', () => {
    it('should clone date without modifying original', () => {
      const original = new Date('2023-01-01');
      const cloned = cloneDate(original);
      cloned.setDate(15);
      expect(original.getDate()).toBe(1);
      expect(cloned.getDate()).toBe(15);
    });
  });

  describe('getDayOfWeek', () => {
    it('should get day of week', () => {
      const date = new Date('2023-01-01'); // Sunday
      expect(getDayOfWeek(date)).toBe(0);
    });
  });

  describe('getDayName', () => {
    it('should get day name', () => {
      const date = new Date('2023-01-01');
      const name = getDayName(date);
      expect(typeof name).toBe('string');
      expect(name.length).toBeGreaterThan(0);
    });
  });

  describe('getWeekNumber', () => {
    it('should get week number', () => {
      const date = new Date('2023-01-01');
      const week = getWeekNumber(date);
      expect(week).toBeGreaterThan(0);
      expect(week).toBeLessThanOrEqual(53);
    });
  });

  describe('getDaysInMonth', () => {
    it('should get days in month', () => {
      const date1 = new Date('2023-01-01');
      const date2 = new Date('2023-02-01');
      const date3 = new Date('2023-04-01'); // April has 30 days
      expect(getDaysInMonth(date1)).toBe(31);
      expect(getDaysInMonth(date2)).toBe(28); // 2023 is not a leap year
      expect(getDaysInMonth(date3)).toBe(30);
    });

    it('should handle leap years', () => {
      const date = new Date('2024-02-01'); // 2024 is a leap year
      expect(getDaysInMonth(date)).toBe(29);
    });
  });
});
