# @genlib/toolkit-money

金额工具（最小货币单位换算、舍入与格式化）。

## 安装

```bash
pnpm add @genlib/toolkit-money
```

## API

### 货币单位转换

- **`toMinor(amount: number, digits?: number): number`** - 将主货币单位转换为最小货币单位（例如：元 → 分）
- **`fromMinor(minor: number, digits?: number): number`** - 将最小货币单位转换为主货币单位（例如：分 → 元）

### 金额舍入和精度

- **`roundMoney(amount: number, digits?: number): number`** - 金额舍入（四舍五入）
- **`truncateMoney(amount: number, digits?: number): number`** - 金额截断（向下取整）
- **`toFixedMoney(amount: number, digits?: number): string`** - 金额格式化到指定小数位（返回字符串）

### 金额格式化

- **`formatMoney(amount: number, currency?: string, locale?: string): string`** - 使用 Intl.NumberFormat 格式化金额
- **`formatMoneyWithSymbol(amount: number, currency?: string, locale?: string): string`** - 格式化金额，带货币符号

### 金额计算

- **`addMoney(a: number, b: number, digits?: number): number`** - 金额相加（避免浮点数精度问题）
- **`subtractMoney(a: number, b: number, digits?: number): number`** - 金额相减
- **`multiplyMoney(a: number, b: number, digits?: number): number`** - 金额相乘
- **`divideMoney(a: number, b: number, digits?: number): number`** - 金额相除

### 金额比较

- **`compareMoney(a: number, b: number): number`** - 比较两个金额（返回 -1、0 或 1）
- **`isMoneyEqual(a: number, b: number): boolean`** - 判断两个金额是否相等
- **`isMoneyGreater(a: number, b: number): boolean`** - 判断第一个金额是否大于第二个
- **`isMoneyLess(a: number, b: number): boolean`** - 判断第一个金额是否小于第二个
- **`isMoneyGreaterOrEqual(a: number, b: number): boolean`** - 判断第一个金额是否大于等于第二个
- **`isMoneyLessOrEqual(a: number, b: number): boolean`** - 判断第一个金额是否小于等于第二个

### 金额验证

- **`isValidAmount(amount: unknown): amount is number`** - 验证金额是否有效（非负数、非 NaN、有限数）

### 货币信息

- **`getCurrencySymbol(currency: string): string`** - 获取货币符号
- **`getCurrencyName(currency: string): string`** - 获取货币名称

## 示例

### 货币单位转换

```typescript
import { toMinor, fromMinor } from '@genlib/toolkit-money';

toMinor(12.34); // 1234（元转分）
toMinor(1.234, 3); // 1234（支持自定义小数位）

fromMinor(1234); // 12.34（分转元）
fromMinor(1234, 3); // 1.234
```

### 金额舍入

```typescript
import { roundMoney, truncateMoney, toFixedMoney } from '@genlib/toolkit-money';

roundMoney(12.345); // 12.35（四舍五入）
roundMoney(12.3456, 3); // 12.346

truncateMoney(12.345); // 12.34（向下截断）
truncateMoney(12.999); // 12.99

toFixedMoney(12.3); // '12.30'
toFixedMoney(12.3456, 3); // '12.346'
```

### 金额格式化

```typescript
import { formatMoney, formatMoneyWithSymbol } from '@genlib/toolkit-money';

formatMoney(12.34, 'CNY'); // '¥12.34'（使用默认 locale 'zh-CN'）
formatMoney(12.34, 'USD', 'en-US'); // '$12.34'
formatMoney(12.34, 'EUR', 'de-DE'); // '12,34 €'

formatMoneyWithSymbol(12.34, 'CNY'); // '¥12.34'
formatMoneyWithSymbol(12.34, 'USD'); // '$12.34'
```

### 金额计算

```typescript
import { addMoney, subtractMoney, multiplyMoney, divideMoney } from '@genlib/toolkit-money';

// 避免浮点数精度问题
addMoney(0.1, 0.2); // 0.3（而不是 0.30000000000000004）
subtractMoney(3.3, 2.2); // 1.1

multiplyMoney(2.5, 2); // 5.0
multiplyMoney(10, 0.1); // 1.0

divideMoney(10, 2); // 5.0
divideMoney(1, 3); // 0.33
```

### 金额比较

```typescript
import {
  compareMoney,
  isMoneyEqual,
  isMoneyGreater,
  isMoneyLess,
} from '@genlib/toolkit-money';

compareMoney(1.0, 2.0); // -1（小于）
compareMoney(2.0, 1.0); // 1（大于）
compareMoney(1.0, 1.0); // 0（相等）

isMoneyEqual(1.0, 1.0); // true
isMoneyGreater(2.0, 1.0); // true
isMoneyLess(1.0, 2.0); // true

// 处理浮点数精度问题
isMoneyEqual(0.1 + 0.2, 0.3); // true
```

### 金额验证

```typescript
import { isValidAmount } from '@genlib/toolkit-money';

isValidAmount(123); // true
isValidAmount(-1); // false（负数无效）
isValidAmount(NaN); // false
isValidAmount(Infinity); // false
isValidAmount('123'); // false（必须是数字）
```

### 货币信息

```typescript
import { getCurrencySymbol, getCurrencyName } from '@genlib/toolkit-money';

getCurrencySymbol('CNY'); // '¥'
getCurrencySymbol('USD'); // '$'
getCurrencySymbol('EUR'); // '€'

getCurrencyName('CNY'); // '人民币'
getCurrencyName('USD'); // '美元'
getCurrencyName('EUR'); // '欧元'
```

## 特性

- ✅ 完整的 TypeScript 类型支持
- ✅ 处理浮点数精度问题
- ✅ 支持多种货币格式化
- ✅ 提供完整的金额计算和比较功能
- ✅ 兼容浏览器和 Node.js 环境
