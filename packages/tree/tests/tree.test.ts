import { describe, expect, it } from 'vitest';
import {
  filterTree,
  findAllInTree,
  findById,
  findInTree,
  flattenTree,
  getNodeDepth,
  getNodePath,
  insertNode,
  insertNodeAt,
  removeNode,
  toTree,
  traverseTree,
  updateNode,
} from '../src/index';

interface TestNode {
  id: number;
  parentId: number | null;
  name: string;
}

describe('tree utils', () => {
  const items: TestNode[] = [
    { id: 1, parentId: null, name: 'Root 1' },
    { id: 2, parentId: 1, name: 'Child 1-1' },
    { id: 3, parentId: 1, name: 'Child 1-2' },
    { id: 4, parentId: 2, name: 'Grandchild 1-1-1' },
    { id: 5, parentId: null, name: 'Root 2' },
  ];

  describe('toTree', () => {
    it('should convert flat array to tree', () => {
      const tree = toTree(items);
      expect(tree.length).toBe(2);
      expect(tree[0].children?.length).toBe(2);
      expect(tree[0].children?.[0].children?.length).toBe(1);
    });
  });

  describe('flattenTree', () => {
    it('should flatten tree to array', () => {
      const tree = toTree(items);
      const flat = flattenTree(tree);
      expect(flat.length).toBe(5);
      expect(flat[0]).not.toHaveProperty('children');
    });
  });

  describe('findInTree', () => {
    it('should find node by predicate', () => {
      const tree = toTree(items);
      const found = findInTree(tree, (node) => (node as TestNode).name === 'Child 1-1');
      expect(found).toBeTruthy();
      expect((found as TestNode).name).toBe('Child 1-1');
    });

    it('should return undefined if not found', () => {
      const tree = toTree(items);
      const found = findInTree(tree, (node) => (node as TestNode).name === 'Not Found');
      expect(found).toBeUndefined();
    });
  });

  describe('findById', () => {
    it('should find node by id', () => {
      const tree = toTree(items);
      const found = findById(tree, 2);
      expect(found).toBeTruthy();
      expect((found as TestNode).name).toBe('Child 1-1');
    });

    it('should return undefined if id not found', () => {
      const tree = toTree(items);
      const found = findById(tree, 999);
      expect(found).toBeUndefined();
    });
  });

  describe('findAllInTree', () => {
    it('should find all matching nodes', () => {
      const tree = toTree(items);
      const found = findAllInTree(tree, (node) => node.id > 2);
      expect(found.length).toBeGreaterThan(0);
    });
  });

  describe('filterTree', () => {
    it('should filter tree keeping matched nodes and parents', () => {
      const tree = toTree(items);
      const filtered = filterTree(tree, (node) => (node as TestNode).name.includes('1-1'));
      expect(filtered.length).toBeGreaterThan(0);
      // 应该保留匹配节点及其父节点
      const hasRoot1 = filtered.some((node) => (node as TestNode).name === 'Root 1');
      expect(hasRoot1).toBe(true);
    });
  });

  describe('insertNode', () => {
    it('should insert node under parent', () => {
      const tree = toTree(items);
      const newNode: TestNode & { children?: unknown[] } = {
        id: 6,
        name: 'New Node',
        children: [],
      };
      const newTree = insertNode(tree, 1, newNode);
      const parent = findById(newTree, 1);
      expect(parent?.children?.some((child) => child.id === 6)).toBe(true);
    });

    it('should insert node at root level', () => {
      const tree = toTree(items);
      const newNode: TestNode & { children?: unknown[] } = {
        id: 6,
        name: 'New Root',
        children: [],
      };
      const newTree = insertNode(tree, null, newNode);
      expect(newTree.length).toBe(tree.length + 1);
      expect(newTree[newTree.length - 1].id).toBe(6);
    });
  });

  describe('insertNodeAt', () => {
    it('should insert node at specific index', () => {
      const tree = toTree(items);
      const newNode: TestNode & { children?: unknown[] } = {
        id: 6,
        name: 'New Node',
        children: [],
      };
      const newTree = insertNodeAt(tree, 1, 0, newNode);
      const parent = findById(newTree, 1);
      expect(parent?.children?.[0].id).toBe(6);
    });
  });

  describe('removeNode', () => {
    it('should remove node by id', () => {
      const tree = toTree(items);
      const newTree = removeNode(tree, 2);
      const found = findById(newTree, 2);
      expect(found).toBeUndefined();
      // 子节点也应该被移除
      const grandchild = findById(newTree, 4);
      expect(grandchild).toBeUndefined();
    });
  });

  describe('updateNode', () => {
    it('should update node', () => {
      const tree = toTree(items);
      const newTree = updateNode(tree, 2, (node) => ({
        ...node,
        name: 'Updated Name',
      }));
      const updated = findById(newTree, 2);
      expect((updated as TestNode).name).toBe('Updated Name');
    });
  });

  describe('traverseTree', () => {
    it('should traverse tree in pre-order', () => {
      const tree = toTree(items);
      const visited: number[] = [];
      traverseTree(tree, (node) => visited.push(node.id), 'pre');
      expect(visited.length).toBe(5);
      expect(visited[0]).toBe(1); // Root first
    });

    it('should traverse tree in post-order', () => {
      const tree = toTree(items);
      const visited: number[] = [];
      traverseTree(tree, (node) => visited.push(node.id), 'post');
      expect(visited.length).toBe(5);
      expect(visited[visited.length - 1]).toBe(5); // Last root
    });
  });

  describe('getNodePath', () => {
    it('should get path to node', () => {
      const tree = toTree(items);
      const path = getNodePath(tree, 4);
      expect(path.length).toBe(3);
      expect(path[0].id).toBe(1);
      expect(path[1].id).toBe(2);
      expect(path[2].id).toBe(4);
    });

    it('should return empty array if node not found', () => {
      const tree = toTree(items);
      const path = getNodePath(tree, 999);
      expect(path).toEqual([]);
    });
  });

  describe('getNodeDepth', () => {
    it('should get node depth', () => {
      const tree = toTree(items);
      expect(getNodeDepth(tree, 1)).toBe(0); // Root
      expect(getNodeDepth(tree, 2)).toBe(1); // Child
      expect(getNodeDepth(tree, 4)).toBe(2); // Grandchild
    });

    it('should return -1 if node not found', () => {
      const tree = toTree(items);
      expect(getNodeDepth(tree, 999)).toBe(-1);
    });
  });
});
