# @genlib/toolkit-tree

树结构处理工具（构建/扁平化/查询/过滤/插入/更新/删除/遍历）。

## 安装
```bash
pnpm add @genlib/toolkit-tree
```

## API

### 基础操作

#### `toTree(items)`
将扁平数组转换为树结构。
```ts
const items = [
  { id: 1, parentId: null, name: 'Root' },
  { id: 2, parentId: 1, name: 'Child' }
];
const tree = toTree(items);
```

#### `flattenTree(nodes)`
将树结构扁平化为数组（移除 children 字段）。
```ts
const flat = flattenTree(tree);
```

### 查询操作

#### `findInTree(nodes, predicate)`
查找第一个匹配的节点。
```ts
const node = findInTree(tree, n => n.name === 'Child');
```

#### `findById(nodes, id)`
根据 ID 查找节点。
```ts
const node = findById(tree, 2);
```

#### `findAllInTree(nodes, predicate)`
查找所有匹配的节点。
```ts
const nodes = findAllInTree(tree, n => n.id > 5);
```

#### `getNodePath(nodes, id)`
获取节点的所有父节点路径（从根到目标节点）。
```ts
const path = getNodePath(tree, 4); // [root, parent, target]
```

#### `getNodeDepth(nodes, id)`
获取节点的深度（根节点为 0）。
```ts
const depth = getNodeDepth(tree, 4); // 2
```

### 过滤操作

#### `filterTree(nodes, predicate)`
过滤树，保留匹配的节点及其路径上的所有父节点。
```ts
const filtered = filterTree(tree, n => n.name.includes('1-1'));
```

### 插入操作

#### `insertNode(nodes, parentId, newNode)`
在指定父节点下插入新节点。
```ts
const newNode = { id: 6, name: 'New Node', children: [] };
const newTree = insertNode(tree, 1, newNode);
```

#### `insertNodeAt(nodes, parentId, index, newNode)`
在指定位置插入新节点（同级节点索引）。
```ts
const newTree = insertNodeAt(tree, 1, 0, newNode); // 插入到第一个位置
```

### 更新操作

#### `updateNode(nodes, id, updater)`
更新指定节点。
```ts
const newTree = updateNode(tree, 2, node => ({
  ...node,
  name: 'Updated Name'
}));
```

### 删除操作

#### `removeNode(nodes, id)`
删除指定节点（包括所有子节点）。
```ts
const newTree = removeNode(tree, 2);
```

### 遍历操作

#### `traverseTree(nodes, callback, order?)`
遍历树节点（深度优先）。
```ts
// 前序遍历（父->子）
traverseTree(tree, node => console.log(node), 'pre');

// 后序遍历（子->父）
traverseTree(tree, node => console.log(node), 'post');
```

## 类型定义

```ts
type TreeNode<T = any> = T & {
  id: string | number;
  children?: TreeNode<T>[];
};
```

## 特性

- ✅ 所有操作都是不可变的（返回新树结构）
- ✅ 完整的 TypeScript 类型支持
- ✅ 支持深度优先遍历
- ✅ 支持路径查询和深度计算
