---
layout: doc
---

# @genlib/toolkit-date

日期工具（显式 API，无全局 polyfill）。

## 安装

```bash
pnpm add @genlib/toolkit-date
```

## API

### 日期比较

#### `isSameDay(a: Date, b: Date): boolean`

比较两个日期是否为同一天。

**示例：**
```typescript
import { isSameDay } from '@genlib/toolkit-date';

const date1 = new Date('2023-01-01T10:00:00');
const date2 = new Date('2023-01-01T20:00:00');
isSameDay(date1, date2); // true
```

#### `isSameMonth(a: Date, b: Date): boolean` / `isSameYear(a: Date, b: Date): boolean`

比较两个日期是否为同一月/年。

#### `isToday(date: Date): boolean` / `isYesterday(date: Date): boolean` / `isTomorrow(date: Date): boolean`

判断日期是否为今天/昨天/明天。

#### `isBefore(a: Date, b: Date): boolean` / `isAfter(a: Date, b: Date): boolean`

判断第一个日期是否早于/晚于第二个日期。

#### `isBetween(date: Date, start: Date, end: Date): boolean`

判断日期是否在指定范围内。

### 日期增减

#### `addDays(date: Date, days: number): Date`

增加天数。返回新的日期对象，不修改原对象。

**示例：**
```typescript
import { addDays } from '@genlib/toolkit-date';

const date = new Date('2023-01-01');
const result = addDays(date, 5);
// result: 2023-01-06
// date: 仍然是 2023-01-01（未修改）
```

#### `addMonths(date: Date, months: number): Date` / `addYears(date: Date, years: number): Date`

增加月数/年数。

#### `addHours(date: Date, hours: number): Date` / `addMinutes(date: Date, minutes: number): Date` / `addSeconds(date: Date, seconds: number): Date` / `addMilliseconds(date: Date, milliseconds: number): Date`

增加小时/分钟/秒数/毫秒。

#### `subtractDays(date: Date, days: number): Date` / `subtractMonths(date: Date, months: number): Date` / `subtractYears(date: Date, years: number): Date`

减去天数/月数/年数。

### 日期格式化

#### `formatISO(date: Date): string`

格式化为 ISO 8601 字符串。

**示例：**
```typescript
import { formatISO } from '@genlib/toolkit-date';

formatISO(new Date('2023-01-01T10:30:45Z'));
// '2023-01-01T10:30:45.000Z'
```

#### `formatDate(date: Date): string`

格式化为日期字符串（YYYY-MM-DD）。

#### `formatDateTime(date: Date): string`

格式化为日期时间字符串（YYYY-MM-DD HH:mm:ss）。

#### `formatTime(date: Date): string`

格式化为时间字符串（HH:mm:ss）。

### 日期获取（开始/结束）

#### `startOfDay(date: Date): Date`

获取一天的开始时间（00:00:00.000）。

**示例：**
```typescript
import { startOfDay, endOfDay } from '@genlib/toolkit-date';

const date = new Date('2023-01-15T14:30:45');
startOfDay(date); // 2023-01-15T00:00:00.000
endOfDay(date); // 2023-01-15T23:59:59.999
```

#### `startOfWeek(date: Date, weekStartsOn?: number): Date` / `endOfWeek(date: Date, weekStartsOn?: number): Date`

获取一周的开始/结束时间。`weekStartsOn` 默认为 1（周一）。

#### `startOfMonth(date: Date): Date` / `endOfMonth(date: Date): Date`

获取一个月的开始/结束时间。

#### `startOfYear(date: Date): Date` / `endOfYear(date: Date): Date`

获取一年的开始/结束时间。

### 日期计算

#### `diffDays(a: Date, b: Date): number`

计算两个日期之间的天数差。

**示例：**
```typescript
import { diffDays, diffMonths, diffYears } from '@genlib/toolkit-date';

const date1 = new Date('2023-01-01');
const date2 = new Date('2023-01-05');
diffDays(date2, date1); // 4
```

#### `diffMonths(a: Date, b: Date): number` / `diffYears(a: Date, b: Date): number`

计算两个日期之间的月数差/年数差。

#### `diffHours(a: Date, b: Date): number` / `diffMinutes(a: Date, b: Date): number` / `diffSeconds(a: Date, b: Date): number`

计算两个日期之间的小时差/分钟差/秒数差。

### 日期工具

#### `isValidDate(date: unknown): date is Date`

验证日期是否有效（类型守卫）。

**示例：**
```typescript
import { isValidDate } from '@genlib/toolkit-date';

isValidDate(new Date()); // true
isValidDate(new Date('invalid')); // false
isValidDate('2023-01-01'); // false
```

#### `getDayOfWeek(date: Date): number`

获取星期几（0 = 周日, 1 = 周一, ..., 6 = 周六）。

#### `getDayName(date: Date, locale?: string): string`

获取星期几的名称。

#### `getWeekNumber(date: Date): number`

获取一年中的第几周（ISO 8601 标准）。

#### `getDaysInMonth(date: Date): number`

获取月份中的天数。自动处理闰年。

**示例：**
```typescript
import { getDaysInMonth } from '@genlib/toolkit-date';

getDaysInMonth(new Date('2023-01-15')); // 31
getDaysInMonth(new Date('2023-02-01')); // 28 (非闰年)
getDaysInMonth(new Date('2024-02-01')); // 29 (闰年)
```

#### `cloneDate(date: Date): Date`

克隆日期对象（不修改原对象）。

## 完整示例

```typescript
import {
  isSameDay,
  addDays,
  formatDate,
  startOfMonth,
  endOfMonth,
  diffDays,
  isValidDate,
  getDaysInMonth,
} from '@genlib/toolkit-date';

// 日期比较
const today = new Date();
const tomorrow = addDays(today, 1);
if (isSameDay(tomorrow, addDays(new Date(), 1))) {
  console.log('是明天');
}

// 日期格式化
console.log(formatDate(new Date())); // '2023-01-15'

// 获取月份范围
const monthStart = startOfMonth(new Date());
const monthEnd = endOfMonth(new Date());
const daysInMonth = getDaysInMonth(new Date());

// 计算日期差
const days = diffDays(monthEnd, monthStart); // 当月天数

// 日期验证
if (isValidDate(userInput)) {
  // userInput 被类型守卫识别为 Date
  console.log(formatDate(userInput));
}
```

## 特性

- ✅ 完整的 TypeScript 类型支持（包括类型守卫）
- ✅ 不可变操作（所有函数返回新日期对象，不修改原对象）
- ✅ 覆盖所有常用的日期处理场景
- ✅ 完整的测试覆盖（45+ 个测试用例）
- ✅ 兼容浏览器和 Node.js 环境
- ✅ 无全局 polyfill，显式 API
