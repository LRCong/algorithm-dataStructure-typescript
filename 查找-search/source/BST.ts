import ST, { Comparator } from './Interface'

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

    private min(root: Node<K, V>): Node<K, V> {
        if (root === null) return null;
        if (root.left === null) return root;
        return this.min(root.left);
    }

    private deleteMin(root: Node<K, V>): Node<K, V> {
        if (root.left === null) return root.right;
        root.left = this.deleteMin(root.left);
        return root;
    }

    private _delete(root: Node<K, V>, key: K) {
        if (root === null) return null;
        let cmp = this.comparator(root.key, key);
        if (cmp < 0) root.left = this._delete(root.left, key);
        else if (cmp > 0) root.right = this._delete(root.right, key);
        else {
            if (root.left === null) return root.right;
            if (root.right === null) return root.left;
            let n = this.min(root.right);
            n.right = this.deleteMin(root.right);
            n.left = root.left;
            root = n;
        }
        return root;
    }

    public delete(key: K): void | V {
        this.root = this._delete(this.root, key);
    }

}
