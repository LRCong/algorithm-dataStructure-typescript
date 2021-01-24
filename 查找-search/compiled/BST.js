import ST from './Interface';
/**
 * 树节点定义
 */
class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
/**
 * 基于二叉搜索树的符号表
 * 相比于顺序符号表，插入时间复杂度为O(logN)，搜索复杂度也为O(logN)
 * 另外还实现了floor，ceiling，min，max方法
 */
export default class BST extends ST {
    constructor(comparator) {
        super();
        this.comparator = comparator;
        this.root = null;
    }
    _put(root, key, value) {
        if (root === null) {
            root = new Node(key, value);
            return root;
        }
        let cmp = this.comparator(key, root.key);
        if (cmp === 0)
            root.value = value;
        else if (cmp > 0)
            root.left = this._put(root.left, key, value);
        else
            root.right = this._put(root.right, key, value);
        return root;
    }
    put(key, value) {
        this.root = this._put(this.root, key, value);
        return true;
    }
    _get(root, key) {
        if (root === null) {
            return null;
        }
        let cmp = this.comparator(key, root.key);
        if (cmp === 0)
            return root.value;
        else if (cmp > 0)
            return this._get(root.left, key);
        else
            return this._get(root.right, key);
    }
    get(key) {
        return this._get(this.root, key);
    }
    contains(key) {
        return this.get(key) !== null;
    }
    _min(root) {
        if (root === null)
            return null;
        if (root.left === null)
            return root;
        return this._min(root.left);
    }
    min() {
        let tmp = this._min(this.root);
        return tmp === null ? undefined : tmp.value;
    }
    _max(root) {
        if (root === null)
            return null;
        if (root.right === null)
            return root;
        return this._min(root.right);
    }
    max() {
        let tmp = this._max(this.root);
        return tmp === null ? undefined : tmp.value;
    }
    _floor(root, key) {
        if (root === null)
            return undefined;
        let cmp = this.comparator(root.key, key);
        if (cmp === 0)
            return root.value;
        if (cmp > 0)
            return this._floor(root.left, key);
        let n = this._floor(root.right, key);
        if (n === undefined)
            return root.value;
        return n;
    }
    floor(key) {
        return this._floor(this.root, key);
    }
    _ceiling(root, key) {
        if (root === null)
            return undefined;
        let cmp = this.comparator(root.key, key);
        if (cmp === 0)
            return root.value;
        if (cmp < 0)
            return this._ceiling(root.right, key);
        let n = this._floor(root.left, key);
        if (n === undefined)
            return root.value;
        return n;
    }
    ceiling(key) {
        return this._ceiling(this.root, key);
    }
    _deleteMin(root) {
        if (root === null)
            return null;
        if (root.left === null)
            return root.right;
        root.left = this._deleteMin(root.left);
        return root;
    }
    deleteMin() {
        this.root = this._deleteMin(this.root);
    }
    _deleteMax(root) {
        if (root === null)
            return null;
        if (root.right === null)
            return root.left;
        root.right = this._deleteMax(root.right);
        return root;
    }
    deleteMax() {
        this.root = this._deleteMax(this.root);
    }
    _delete(root, key) {
        if (root === null)
            return null;
        let cmp = this.comparator(root.key, key);
        if (cmp < 0)
            root.left = this._delete(root.left, key);
        else if (cmp > 0)
            root.right = this._delete(root.right, key);
        else {
            if (root.left === null)
                return root.right;
            if (root.right === null)
                return root.left;
            let n = this._min(root.right);
            n.right = this._deleteMin(root.right);
            n.left = root.left;
            root = n;
        }
        return root;
    }
    delete(key) {
        this.root = this._delete(this.root, key);
    }
    _size(root) {
        if (root === null)
            return 0;
        return 1 + this._size(root.left) + this._size(root.right);
    }
    size() {
        return this._size(this.root);
    }
    _select(root, n) {
        if (root === null)
            return undefined;
        let left = this._size(root.left);
        if (left > n)
            return this._select(root.left, n);
        else if (left < n)
            return this._select(root.right, n - left - 1);
        return root.value;
    }
    select(n) {
        return this._select(this.root, n);
    }
    _rank(root, key) {
        if (root === null)
            return 0;
        let cmp = this.comparator(key, root.key);
        if (cmp > 0)
            return this._rank(root.left, key);
        else if (cmp < 0)
            return 1 + this._rank(root.left, key) + this._rank(root.right, key);
        return this._size(root.left);
    }
    rank(key) {
        return this._rank(this.root, key);
    }
}
