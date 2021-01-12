import ST, { Comparator } from './Interface'

/**
 * 定义红黑树节点的颜色
 */
enum Colors {
    RED,
    BLACK
}

/**
 * 红黑树节点定义，相比普通的二叉搜索树节点，增加了颜色属性
 */
class Node<K, V> {
    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }

    public key: K;
    public value: V;
    public left: Node<K, V>;
    public right: Node<K, V>;
    public color: Colors;
}

/**
 * 红黑树实现的查找表，任何查找复杂度不会超过logN
 * 实现了插入和查找，删除还没有实现
 */
export class ReadBLACKBST<K, V> extends ST<K, V> {
    constructor(comparator: Comparator<K>) {
        super(comparator);
        this.root = null;
    }

    private root: Node<K, V>;

    private isRED(root: Node<K, V>): boolean {
        return root != null && root.color === Colors.RED;
    }

    private flipColor(root: Node<K, V>): void {
        root.left.color = Colors.BLACK
        root.right.color = Colors.BLACK
        return;
    }

    private rotateLeft(root: Node<K, V>): Node<K, V> {
        let tmp = root.right;
        root.right = tmp.left;
        tmp.left = root;
        return tmp;
    }

    private rotateRight(root: Node<K, V>): Node<K, V> {
        let tmp = root.left;
        root.left = tmp.right;
        tmp.right = root;
        return tmp;
    }

    private _put(root: Node<K, V>, key: K, value: V): Node<K, V> {
        if (root === null) {
            root = new Node<K, V>(key, value);
            root.color = Colors.RED;
            return root;
        }
        let cmp = this.comparator(key, root.key)
        if (cmp === 0)
            root.value = value;
        else if (cmp > 0)
            root.left = this._put(root.left, key, value);
        else
            root.right = this._put(root.right, key, value);

        if (!this.isRED(root.left) && this.isRED(root.right)) root = this.rotateLeft(root);
        if (root.left != null && this.isRED(root.left) && this.isRED(root.left.left)) root = this.rotateRight(root);
        if (this.isRED(root.left) && this.isRED(root.right)) this.flipColor(root);

        return root;
    }

    public put(key: K, value: V): boolean {
        this.root = this._put(this.root, key, value);
        this.root.color = Colors.BLACK;
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

    public delete(key: K): void | V {
        throw new Error('Method not implemented.');
    }
}