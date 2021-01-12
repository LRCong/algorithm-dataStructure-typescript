import ST, { Comparator } from './Interface'

/**
 * 树节点定义
 */
class Node<K, V> {
    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
    }

    public key: K;
    public value: V;
    public left: Node<K, V>;
    public right: Node<K, V>;
}

/**
 * 基于二叉搜索树的符号表
 * 相比于顺序符号表，插入时间复杂度为O(logN)，搜索复杂度也为O(logN)
 * 另外还实现了floor，ceiling，min，max方法
 */
export default class BST<K, V> extends ST<K, V> {
    constructor(comparator: Comparator<K>) {
        super(comparator);
        this.root = null;
    }

    private root: Node<K, V>;

    private _put(root: Node<K, V>, key: K, value: V): Node<K, V> {
        if (root === null) {
            root = new Node<K, V>(key, value);
            return root;
        }
        let cmp = this.comparator(key, root.key)
        if (cmp === 0)
            root.value = value;
        else if (cmp > 0)
            root.left = this._put(root.left, key, value);
        else
            root.right = this._put(root.right, key, value);
        return root;
    }

    public put(key: K, value: V): boolean {
        this.root = this._put(this.root, key, value);
        return true;
    }

    private _get(root: Node<K, V>, key: K): void | V {
        if (root === null) {
            return null;
        }
        let cmp = this.comparator(key, root.key)
        if (cmp === 0)
            return root.value;
        else if (cmp > 0)
            return this._get(root.left, key);
        else
            return this._get(root.right, key);
    }

    public get(key: K): void | V {
        return this._get(this.root, key);
    }

    public contains(key: K): boolean {
        return this.get(key) !== null;
    }

    private _min(root: Node<K, V>): Node<K, V> {
        if (root === null) return null;
        if (root.left === null) return root;
        return this._min(root.left);
    }

    public min(): V {
        let tmp = this._min(this.root)
        return tmp === null ? undefined : tmp.value;
    }

    private _max(root: Node<K, V>): Node<K, V> {
        if (root === null) return null;
        if (root.right === null) return root;
        return this._min(root.right);
    }

    public max(): V {
        let tmp = this._max(this.root)
        return tmp === null ? undefined : tmp.value;
    }

    private _floor(root: Node<K, V>, key: K): V {
        if (root === null) return undefined;
        let cmp = this.comparator(root.key, key);
        if (cmp === 0) return root.value;
        if (cmp > 0) return this._floor(root.left, key);
        let n: V = this._floor(root.right, key);
        if (n === undefined) return root.value;
        return n;
    }

    public floor(key: K): V {
        return this._floor(this.root, key);
    }

    private _ceiling(root: Node<K, V>, key: K): V {
        if (root === null) return undefined;
        let cmp = this.comparator(root.key, key);
        if (cmp === 0) return root.value;
        if (cmp < 0) return this._ceiling(root.right, key);
        let n: V = this._floor(root.left, key);
        if (n === undefined) return root.value;
        return n;
    }

    public ceiling(key: K): V {
        return this._ceiling(this.root, key);
    }

    private _deleteMin(root: Node<K, V>): Node<K, V> {
        if (root === null) return null;
        if (root.left === null) return root.right;
        root.left = this._deleteMin(root.left);
        return root;
    }

    public deleteMin(): void {
        this.root = this._deleteMin(this.root);
    }

    private _deleteMax(root: Node<K, V>): Node<K, V> {
        if (root === null) return null;
        if (root.right === null) return root.left;
        root.right = this._deleteMax(root.right);
        return root;
    }

    public deleteMax(): void {
        this.root = this._deleteMax(this.root);
    }

    private _delete(root: Node<K, V>, key: K) {
        if (root === null) return null;
        let cmp = this.comparator(root.key, key);
        if (cmp < 0) root.left = this._delete(root.left, key);
        else if (cmp > 0) root.right = this._delete(root.right, key);
        else {
            if (root.left === null) return root.right;
            if (root.right === null) return root.left;
            let n = this._min(root.right);
            n.right = this._deleteMin(root.right);
            n.left = root.left;
            root = n;
        }
        return root;
    }

    public delete(key: K): void | V {
        this.root = this._delete(this.root, key);
    }

    private _size(root: Node<K, V>): number {
        if (root === null) return 0;
        return 1 + this._size(root.left) + this._size(root.right);
    }

    public size(): number {
        return this._size(this.root);
    }

    private _select(root: Node<K, V>, n: number): V {
        if (root === null) return undefined;
        let left = this._size(root.left);
        if (left > n) return this._select(root.left, n);
        else if (left < n) return this._select(root.right, n - left - 1);
        return root.value;
    }

    public select(n: number): V {
        return this._select(this.root, n);
    }

    private _rank(root: Node<K, V>, key: K): number {
        if (root === null) return 0;
        let cmp = this.comparator(key, root.key);
        if (cmp > 0) return this._rank(root.left, key);
        else if (cmp < 0) return 1 + this._rank(root.left, key) + this._rank(root.right, key);
        return this._size(root.left);
    }

    public rank(key: K): number {
        return this._rank(this.root, key);
    }
}
