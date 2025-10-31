# @genlib/toolkit-tree

树结构处理工具（构建/扁平化/查找）。

## 安装
```bash
pnpm add @genlib/toolkit-tree
```

## API
- `toTree(items: { id: string|number; parentId?: string|number|null }[]): TreeNode[]`
- `flattenTree(nodes: TreeNode[]): Array<Omit<TreeNode,'children'>>`
- `findInTree(nodes: TreeNode[], pred: (n: TreeNode) => boolean): TreeNode | undefined`

## 示例
```ts
import { toTree, flattenTree, findInTree } from '@genlib/toolkit-tree';

const items = [ { id:1, parentId:null, name:'a' }, { id:2, parentId:1, name:'b' } ];
const tree = toTree(items);
flattenTree(tree as any); // [{ id:1, name:'a' }, { id:2, name:'b' }]
findInTree(tree as any, n => (n as any).name === 'b');
```
