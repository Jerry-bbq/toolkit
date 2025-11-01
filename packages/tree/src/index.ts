/**
 * 树节点类型定义
 */
export type TreeNode<T = Record<string, unknown>> = T & {
  id: string | number;
  children?: TreeNode<T>[];
};

/**
 * 将扁平数组转换为树结构
 * @param items 扁平数组，每个元素需有 id 和可选的 parentId
 * @returns 树结构数组
 */
export const toTree = <T extends { id: string | number; parentId?: string | number | null }>(
  items: T[]
): TreeNode<T>[] => {
  const map = new Map<string | number, TreeNode<T>>();
  const roots: TreeNode<T>[] = [];

  // 创建所有节点的映射
  for (const item of items) {
    map.set(item.id, { ...item, children: [] });
  }

  // 构建父子关系
  for (const item of items) {
    const node = map.get(item.id);
    if (!node) continue;
    if (item.parentId == null || item.parentId === '') {
      roots.push(node);
    } else {
      const parent = map.get(item.parentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(node);
      }
    }
  }

  return roots;
};

/**
 * 将树结构扁平化为数组
 * @param nodes 树节点数组
 * @returns 扁平化数组（移除 children 字段）
 */
export const flattenTree = <T extends { id: string | number; children?: T[] }>(
  nodes: TreeNode<T>[]
): Omit<T, 'children'>[] => {
  const result: Omit<T, 'children'>[] = [];
  const stack: TreeNode<T>[] = [...nodes];

  while (stack.length > 0) {
    const node = stack.shift();
    if (!node) continue;
    const { children, ...rest } = node;
    result.push(rest);
    if (children && children.length > 0) {
      stack.unshift(...children);
    }
  }

  return result;
};

/**
 * 查找第一个匹配的节点
 * @param nodes 树节点数组
 * @param predicate 查找条件函数
 * @returns 找到的节点，未找到返回 undefined
 */
export const findInTree = <T>(
  nodes: TreeNode<T>[],
  predicate: (node: TreeNode<T>) => boolean
): TreeNode<T> | undefined => {
  const stack = [...nodes];

  while (stack.length > 0) {
    const node = stack.shift();
    if (!node) continue;
    if (predicate(node)) {
      return node;
    }
    if (node.children && node.children.length > 0) {
      stack.unshift(...node.children);
    }
  }

  return undefined;
};

/**
 * 根据 ID 查找节点
 * @param nodes 树节点数组
 * @param id 节点 ID
 * @returns 找到的节点，未找到返回 undefined
 */
export const findById = <T>(nodes: TreeNode<T>[], id: string | number): TreeNode<T> | undefined => {
  return findInTree(nodes, (node) => node.id === id);
};

/**
 * 查找所有匹配的节点
 * @param nodes 树节点数组
 * @param predicate 查找条件函数
 * @returns 所有匹配的节点数组
 */
export const findAllInTree = <T>(
  nodes: TreeNode<T>[],
  predicate: (node: TreeNode<T>) => boolean
): TreeNode<T>[] => {
  const result: TreeNode<T>[] = [];
  const stack = [...nodes];

  while (stack.length > 0) {
    const node = stack.shift();
    if (!node) continue;
    if (predicate(node)) {
      result.push(node);
    }
    if (node.children && node.children.length > 0) {
      stack.unshift(...node.children);
    }
  }

  return result;
};

/**
 * 过滤树，保留匹配的节点及其路径上的所有父节点
 * @param nodes 树节点数组
 * @param predicate 过滤条件函数
 * @returns 过滤后的树（保留匹配节点及其父节点）
 */
export const filterTree = <T>(
  nodes: TreeNode<T>[],
  predicate: (node: TreeNode<T>) => boolean
): TreeNode<T>[] => {
  const filterNode = (node: TreeNode<T>): TreeNode<T> | null => {
    const matched = predicate(node);
    const filteredChildren: TreeNode<T>[] = [];

    if (node.children) {
      for (const child of node.children) {
        const filtered = filterNode(child);
        if (filtered) {
          filteredChildren.push(filtered);
        }
      }
    }

    if (matched || filteredChildren.length > 0) {
      return {
        ...node,
        children: filteredChildren.length > 0 ? filteredChildren : undefined,
      };
    }

    return null;
  };

  return nodes.map(filterNode).filter((node): node is TreeNode<T> => node !== null);
};

/**
 * 在指定父节点下插入新节点
 * @param nodes 树节点数组
 * @param parentId 父节点 ID，null 表示插入到根节点
 * @param newNode 新节点
 * @returns 新的树结构（不可变）
 */
export const insertNode = <T>(
  nodes: TreeNode<T>[],
  parentId: string | number | null,
  newNode: TreeNode<T>
): TreeNode<T>[] => {
  if (parentId === null) {
    return [...nodes, newNode];
  }

  const insertRecursive = (nodeList: TreeNode<T>[]): TreeNode<T>[] => {
    return nodeList.map((node) => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...(node.children || []), newNode],
        };
      }
      if (node.children) {
        return {
          ...node,
          children: insertRecursive(node.children),
        };
      }
      return node;
    });
  };

  return insertRecursive(nodes);
};

/**
 * 在指定位置插入新节点（同级节点索引）
 * @param nodes 树节点数组
 * @param parentId 父节点 ID，null 表示插入到根节点
 * @param index 插入位置索引
 * @param newNode 新节点
 * @returns 新的树结构（不可变）
 */
export const insertNodeAt = <T>(
  nodes: TreeNode<T>[],
  parentId: string | number | null,
  index: number,
  newNode: TreeNode<T>
): TreeNode<T>[] => {
  if (parentId === null) {
    const newNodes = [...nodes];
    newNodes.splice(index, 0, newNode);
    return newNodes;
  }

  const insertRecursive = (nodeList: TreeNode<T>[]): TreeNode<T>[] => {
    return nodeList.map((node) => {
      if (node.id === parentId) {
        const children = node.children || [];
        const newChildren = [...children];
        newChildren.splice(index, 0, newNode);
        return {
          ...node,
          children: newChildren,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: insertRecursive(node.children),
        };
      }
      return node;
    });
  };

  return insertRecursive(nodes);
};

/**
 * 删除指定节点
 * @param nodes 树节点数组
 * @param id 要删除的节点 ID
 * @returns 新的树结构（不可变）
 */
export const removeNode = <T>(nodes: TreeNode<T>[], id: string | number): TreeNode<T>[] => {
  const removeRecursive = (nodeList: TreeNode<T>[]): TreeNode<T>[] => {
    return nodeList
      .filter((node) => node.id !== id)
      .map((node) => {
        if (node.children) {
          return {
            ...node,
            children: removeRecursive(node.children),
          };
        }
        return node;
      });
  };

  return removeRecursive(nodes);
};

/**
 * 更新指定节点
 * @param nodes 树节点数组
 * @param id 要更新的节点 ID
 * @param updater 更新函数，接收原节点返回新节点
 * @returns 新的树结构（不可变）
 */
export const updateNode = <T>(
  nodes: TreeNode<T>[],
  id: string | number,
  updater: (node: TreeNode<T>) => TreeNode<T>
): TreeNode<T>[] => {
  const updateRecursive = (nodeList: TreeNode<T>[]): TreeNode<T>[] => {
    return nodeList.map((node) => {
      if (node.id === id) {
        return updater(node);
      }
      if (node.children) {
        return {
          ...node,
          children: updateRecursive(node.children),
        };
      }
      return node;
    });
  };

  return updateRecursive(nodes);
};

/**
 * 遍历树节点（深度优先）
 * @param nodes 树节点数组
 * @param callback 回调函数
 * @param order 'pre' 前序遍历（父->子）或 'post' 后序遍历（子->父），默认为 'pre'
 */
export const traverseTree = <T>(
  nodes: TreeNode<T>[],
  callback: (node: TreeNode<T>) => void,
  order: 'pre' | 'post' = 'pre'
): void => {
  const traverse = (nodeList: TreeNode<T>[]) => {
    for (const node of nodeList) {
      if (order === 'pre') {
        callback(node);
      }
      if (node.children && node.children.length > 0) {
        traverse(node.children);
      }
      if (order === 'post') {
        callback(node);
      }
    }
  };

  traverse(nodes);
};

/**
 * 获取节点的所有父节点路径
 * @param nodes 树节点数组
 * @param id 节点 ID
 * @returns 从根到目标节点的路径数组
 */
export const getNodePath = <T>(nodes: TreeNode<T>[], id: string | number): TreeNode<T>[] => {
  const findPath = (
    nodeList: TreeNode<T>[],
    targetId: string | number,
    path: TreeNode<T>[]
  ): TreeNode<T>[] | null => {
    for (const node of nodeList) {
      const currentPath = [...path, node];
      if (node.id === targetId) {
        return currentPath;
      }
      if (node.children && node.children.length > 0) {
        const found = findPath(node.children, targetId, currentPath);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  return findPath(nodes, id, []) || [];
};

/**
 * 获取节点的深度
 * @param nodes 树节点数组
 * @param id 节点 ID
 * @returns 节点深度（根节点为 0），未找到返回 -1
 */
export const getNodeDepth = <T>(nodes: TreeNode<T>[], id: string | number): number => {
  const path = getNodePath(nodes, id);
  return path.length > 0 ? path.length - 1 : -1;
};
