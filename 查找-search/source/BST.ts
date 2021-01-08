import ST, { Comparator } from './Interface'

class Node<K, V> {
    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
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
            return undefined;
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
        return this.get(key) !== undefined;
    }
    public delete(key: K): void | V {
        throw new Error('Method not implemented.');
    }

}