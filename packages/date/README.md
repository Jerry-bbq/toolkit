# @genlib/toolkit-date

日期工具（显式 API，无全局 polyfill）。

## 安装

```bash
pnpm add @genlib/toolkit-date
```

## API

### 日期比较

- **`isSameDay(a: Date, b: Date): boolean`** - 比较两个日期是否为同一天
- **`isSameMonth(a: Date, b: Date): boolean`** - 比较两个日期是否为同一月
- **`isSameYear(a: Date, b: Date): boolean`** - 比较两个日期是否为同一年
- **`isToday(date: Date): boolean`** - 判断日期是否为今天
- **`isYesterday(date: Date): boolean`** - 判断日期是否为昨天
- **`isTomorrow(date: Date): boolean`** - 判断日期是否为明天
- **`isBefore(a: Date, b: Date): boolean`** - 判断第一个日期是否早于第二个日期
- **`isAfter(a: Date, b: Date): boolean`** - 判断第一个日期是否晚于第二个日期
- **`isBetween(date: Date, start: Date, end: Date): boolean`** - 判断日期是否在指定范围内

### 日期增减

- **`addDays(date: Date, days: number): Date`** - 增加天数
- **`addMonths(date: Date, months: number): Date`** - 增加月数
- **`addYears(date: Date, years: number): Date`** - 增加年数
- **`addHours(date: Date, hours: number): Date`** - 增加小时
- **`addMinutes(date: Date, minutes: number): Date`** - 增加分钟
- **`addSeconds(date: Date, seconds: number): Date`** - 增加秒数
- **`addMilliseconds(date: Date, milliseconds: number): Date`** - 增加毫秒
- **`subtractDays(date: Date, days: number): Date`** - 减去天数
- **`subtractMonths(date: Date, months: number): Date`** - 减去月数
- **`subtractYears(date: Date, years: number): Date`** - 减去年数

### 日期格式化

- **`formatISO(date: Date): string`** - 格式化为 ISO 8601 字符串
- **`formatDate(date: Date): string`** - 格式化为日期字符串（YYYY-MM-DD）
- **`formatDateTime(date: Date): string`** - 格式化为日期时间字符串（YYYY-MM-DD HH:mm:ss）
- **`formatTime(date: Date): string`** - 格式化为时间字符串（HH:mm:ss）

### 日期获取（开始/结束）

- **`startOfDay(date: Date): Date`** - 获取一天的开始时间（00:00:00.000）
- **`endOfDay(date: Date): Date`** - 获取一天的结束时间（23:59:59.999）
- **`startOfWeek(date: Date, weekStartsOn?: number): Date`** - 获取一周的开始时间（周一 00:00:00.000）
- **`endOfWeek(date: Date, weekStartsOn?: number): Date`** - 获取一周的结束时间（周日 23:59:59.999）
- **`startOfMonth(date: Date): Date`** - 获取一个月的开始时间（当月第一天 00:00:00.000）
- **`endOfMonth(date: Date): Date`** - 获取一个月的结束时间（当月最后一天 23:59:59.999）
- **`startOfYear(date: Date): Date`** - 获取一年的开始时间（1月1日 00:00:00.000）
- **`endOfYear(date: Date): Date`** - 获取一年的结束时间（12月31日 23:59:59.999）

### 日期计算

- **`diffDays(a: Date, b: Date): number`** - 计算两个日期之间的天数差
- **`diffMonths(a: Date, b: Date): number`** - 计算两个日期之间的月数差
- **`diffYears(a: Date, b: Date): number`** - 计算两个日期之间的年数差
- **`diffHours(a: Date, b: Date): number`** - 计算两个日期之间的小时差
- **`diffMinutes(a: Date, b: Date): number`** - 计算两个日期之间的分钟差
- **`diffSeconds(a: Date, b: Date): number`** - 计算两个日期之间的秒数差

### 日期工具

- **`isValidDate(date: unknown): date is Date`** - 验证日期是否有效（类型守卫）
- **`getDayOfWeek(date: Date): number`** - 获取星期几（0 = 周日, 1 = 周一, ..., 6 = 周六）
- **`getDayName(date: Date, locale?: string): string`** - 获取星期几的名称
- **`getWeekNumber(date: Date): number`** - 获取一年中的第几周（ISO 8601 标准）
- **`getDaysInMonth(date: Date): number`** - 获取月份中的天数
- **`cloneDate(date: Date): Date`** - 克隆日期对象（不修改原对象）

## 示例

### 日期比较

```typescript
import {
  isSameDay,
  isSameMonth,
  isToday,
  isYesterday,
  isBefore,
  isAfter,
  isBetween,
} from '@genlib/toolkit-date';

const date1 = new Date('2023-01-01');
const date2 = new Date('2023-01-01T20:00:00');

isSameDay(date1, date2); // true
isSameMonth(date1, date2); // true
isToday(new Date()); // true
isYesterday(new Date(Date.now() - 86400000)); // true

isBefore(date1, date2); // false
isAfter(date2, date1); // false
isBetween(new Date('2023-01-15'), date1, new Date('2023-01-31')); // true
```

### 日期增减

```typescript
import {
  addDays,
  addMonths,
  addYears,
  subtractDays,
} from '@genlib/toolkit-date';

const date = new Date('2023-01-01');

addDays(date, 5); // 2023-01-06
addMonths(date, 2); // 2023-03-01
addYears(date, 1); // 2024-01-01
subtractDays(date, 5); // 2022-12-27
```

### 日期格式化

```typescript
import { formatISO, formatDate, formatDateTime, formatTime } from '@genlib/toolkit-date';

const date = new Date('2023-01-01T10:30:45');

formatISO(date); // '2023-01-01T10:30:45.000Z'
formatDate(date); // '2023-01-01'
formatDateTime(date); // '2023-01-01 10:30:45'
formatTime(date); // '10:30:45'
```

### 日期获取（开始/结束）

```typescript
import {
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from '@genlib/toolkit-date';

const date = new Date('2023-01-15T14:30:45');

startOfDay(date); // 2023-01-15T00:00:00.000
endOfDay(date); // 2023-01-15T23:59:59.999
startOfMonth(date); // 2023-01-01T00:00:00.000
endOfMonth(date); // 2023-01-31T23:59:59.999
startOfYear(date); // 2023-01-01T00:00:00.000
endOfYear(date); // 2023-12-31T23:59:59.999
```

### 日期计算

```typescript
import { diffDays, diffMonths, diffYears } from '@genlib/toolkit-date';

const date1 = new Date('2023-01-01');
const date2 = new Date('2023-01-05');

diffDays(date2, date1); // 4
diffMonths(new Date('2023-03-01'), date1); // 2
diffYears(new Date('2025-01-01'), date1); // 2
```

### 日期工具

```typescript
import {
  isValidDate,
  getDayOfWeek,
  getDayName,
  getWeekNumber,
  getDaysInMonth,
  cloneDate,
} from '@genlib/toolkit-date';

isValidDate(new Date()); // true
isValidDate(new Date('invalid')); // false

getDayOfWeek(new Date('2023-01-01')); // 0 (Sunday)
getDayName(new Date('2023-01-01')); // '星期日' (或根据 locale)
getWeekNumber(new Date('2023-01-01')); // 1
getDaysInMonth(new Date('2023-01-15')); // 31
getDaysInMonth(new Date('2024-02-01')); // 29 (闰年)

const original = new Date('2023-01-01');
const cloned = cloneDate(original);
cloned.setDate(15);
// original 仍然是 2023-01-01
```

## 特性

- ✅ 完整的 TypeScript 类型支持（包括类型守卫）
- ✅ 不可变操作（所有函数返回新日期对象，不修改原对象）
- ✅ 覆盖所有常用的日期处理场景
- ✅ 完整的测试覆盖（45+ 个测试用例）
- ✅ 兼容浏览器和 Node.js 环境
- ✅ 无全局 polyfill，显式 API
