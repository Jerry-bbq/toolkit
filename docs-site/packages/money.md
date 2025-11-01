---
layout: doc
---

# @genlib/toolkit-money

金额工具（最小货币单位换算、舍入与格式化）。

## 安装

```bash
pnpm add @genlib/toolkit-money
```

## API

### 货币单位转换

#### `toMinor(amount: number, digits?: number): number`

将主货币单位转换为最小货币单位（例如：元 → 分，美元 → 美分）。

**参数：**
- `amount` - 主货币单位金额
- `digits` - 小数位数（默认 2，即 1 元 = 100 分）

**返回：** 最小货币单位金额

**示例：**
```typescript
import { toMinor } from '@genlib/toolkit-money';

toMinor(12.34); // 1234
toMinor(1.234, 3); // 1234
```

#### `fromMinor(minor: number, digits?: number): number`

将最小货币单位转换为主货币单位（例如：分 → 元，美分 → 美元）。

**参数：**
- `minor` - 最小货币单位金额
- `digits` - 小数位数（默认 2）

**返回：** 主货币单位金额

**示例：**
```typescript
import { fromMinor } from '@genlib/toolkit-money';

fromMinor(1234); // 12.34
fromMinor(1234, 3); // 1.234
```

### 金额舍入和精度

#### `roundMoney(amount: number, digits?: number): number`

金额舍入（四舍五入），使用精确的方法避免浮点数精度问题。

**参数：**
- `amount` - 金额
- `digits` - 保留小数位数（默认 2）

**返回：** 舍入后的金额

**示例：**
```typescript
import { roundMoney } from '@genlib/toolkit-money';

roundMoney(12.345); // 12.35
roundMoney(12.3456, 3); // 12.346
```

#### `truncateMoney(amount: number, digits?: number): number`

金额截断（向下取整）。

**参数：**
- `amount` - 金额
- `digits` - 保留小数位数（默认 2）

**返回：** 截断后的金额

**示例：**
```typescript
import { truncateMoney } from '@genlib/toolkit-money';

truncateMoney(12.345); // 12.34
truncateMoney(12.999); // 12.99
```

#### `toFixedMoney(amount: number, digits?: number): string`

金额格式化到指定小数位（返回字符串）。

**参数：**
- `amount` - 金额
- `digits` - 保留小数位数（默认 2）

**返回：** 格式化后的金额字符串

**示例：**
```typescript
import { toFixedMoney } from '@genlib/toolkit-money';

toFixedMoney(12.3); // '12.30'
toFixedMoney(12.3456, 3); // '12.346'
```

### 金额格式化

#### `formatMoney(amount: number, currency?: string, locale?: string): string`

使用 Intl.NumberFormat 格式化金额。

**参数：**
- `amount` - 金额
- `currency` - 货币代码（默认 'CNY'）
- `locale` - 区域设置（默认 'zh-CN'）

**返回：** 格式化后的金额字符串

**示例：**
```typescript
import { formatMoney } from '@genlib/toolkit-money';

formatMoney(12.34, 'CNY'); // '¥12.34'
formatMoney(12.34, 'USD', 'en-US'); // '$12.34'
formatMoney(12.34, 'EUR', 'de-DE'); // '12,34 €'
```

#### `formatMoneyWithSymbol(amount: number, currency?: string, locale?: string): string`

格式化金额，带货币符号。

**示例：**
```typescript
import { formatMoneyWithSymbol } from '@genlib/toolkit-money';

formatMoneyWithSymbol(12.34, 'CNY'); // '¥12.34'
formatMoneyWithSymbol(12.34, 'USD'); // '$12.34'
```

### 金额计算

#### `addMoney(a: number, b: number, digits?: number): number`

金额相加，避免浮点数精度问题。

**示例：**
```typescript
import { addMoney } from '@genlib/toolkit-money';

addMoney(0.1, 0.2); // 0.3（而不是 0.30000000000000004）
addMoney(1.1, 2.2); // 3.3
```

#### `subtractMoney(a: number, b: number, digits?: number): number`

金额相减。

#### `multiplyMoney(a: number, b: number, digits?: number): number`

金额相乘。

#### `divideMoney(a: number, b: number, digits?: number): number`

金额相除。如果除数为 0，会抛出错误。

### 金额比较

#### `compareMoney(a: number, b: number): number`

比较两个金额。

**返回：** -1 表示 a < b，0 表示 a === b，1 表示 a > b

**示例：**
```typescript
import { compareMoney } from '@genlib/toolkit-money';

compareMoney(1.0, 2.0); // -1
compareMoney(2.0, 1.0); // 1
compareMoney(1.0, 1.0); // 0
```

#### `isMoneyEqual(a: number, b: number): boolean`

判断两个金额是否相等。

#### `isMoneyGreater(a: number, b: number): boolean`

判断第一个金额是否大于第二个。

#### `isMoneyLess(a: number, b: number): boolean`

判断第一个金额是否小于第二个。

#### `isMoneyGreaterOrEqual(a: number, b: number): boolean`

判断第一个金额是否大于等于第二个。

#### `isMoneyLessOrEqual(a: number, b: number): boolean`

判断第一个金额是否小于等于第二个。

### 金额验证

#### `isValidAmount(amount: unknown): amount is number`

验证金额是否有效。

**返回：** 是否为有效金额（非负数、非 NaN、有限数）

**示例：**
```typescript
import { isValidAmount } from '@genlib/toolkit-money';

isValidAmount(123); // true
isValidAmount(-1); // false
isValidAmount(NaN); // false
isValidAmount(Infinity); // false
```

### 货币信息

#### `getCurrencySymbol(currency: string): string`

获取货币符号。

**支持的货币：** CNY, USD, EUR, GBP, JPY, KRW, AUD, CAD, HKD, SGD, INR, RUB, BRL, MXN, ZAR

**示例：**
```typescript
import { getCurrencySymbol } from '@genlib/toolkit-money';

getCurrencySymbol('CNY'); // '¥'
getCurrencySymbol('USD'); // '$'
getCurrencySymbol('EUR'); // '€'
```

#### `getCurrencyName(currency: string): string`

获取货币名称。

**示例：**
```typescript
import { getCurrencyName } from '@genlib/toolkit-money';

getCurrencyName('CNY'); // '人民币'
getCurrencyName('USD'); // '美元'
```

## 完整示例

```typescript
import {
  toMinor,
  fromMinor,
  roundMoney,
  formatMoney,
  addMoney,
  compareMoney,
  isValidAmount,
  getCurrencySymbol,
} from '@genlib/toolkit-money';

// 金额转换
const cents = toMinor(12.34); // 1234
const dollars = fromMinor(1234); // 12.34

// 金额舍入和格式化
const rounded = roundMoney(12.345); // 12.35
const formatted = formatMoney(12.34, 'CNY'); // '¥12.34'

// 金额计算（避免浮点数精度问题）
const total = addMoney(0.1, 0.2); // 0.3

// 金额比较
if (compareMoney(price, budget) <= 0) {
  // 价格在预算内
}

// 金额验证
if (isValidAmount(userInput)) {
  const symbol = getCurrencySymbol('CNY');
  console.log(`${symbol}${userInput}`);
}
```

## 特性

- ✅ 完整的 TypeScript 类型支持
- ✅ 处理浮点数精度问题
- ✅ 支持多种货币格式化
- ✅ 提供完整的金额计算和比较功能
- ✅ 兼容浏览器和 Node.js 环境
