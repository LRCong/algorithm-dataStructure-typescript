import ST from './Interface';
/**
 * 定义红黑树节点的颜色
 */
var Colors;
(function (Colors) {
    Colors[Colors["RED"] = 0] = "RED";
    Colors[Colors["BLACK"] = 1] = "BLACK";
})(Colors || (Colors = {}));
/**
 * 红黑树节点定义，相比普通的二叉搜索树节点，增加了颜色属性
 */
class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
/**
 * 红黑树实现的查找表，任何查找复杂度不会超过logN
 * 实现了插入和查找，删除还没有实现
 */
export class ReadBLACKBST extends ST {
    constructor(comparator) {
        super();
        this.comparator = comparator;
    }
    isRED(root) {
        return root != null && root.color === Colors.RED;
    }
    flipColor(root) {
        root.left.color = Colors.BLACK;
        root.right.color = Colors.BLACK;
        return;
    }
    rotateLeft(root) {
        let tmp = root.right;
        root.right = tmp.left;
        tmp.left = root;
        return tmp;
    }
    rotateRight(root) {
        let tmp = root.left;
        root.left = tmp.right;
        tmp.right = root;
        return tmp;
    }
    _put(root, key, value) {
        if (root === null) {
            root = new Node(key, value);
            root.color = Colors.RED;
            return root;
        }
        let cmp = this.comparator(key, root.key);
        if (cmp === 0)
            root.value = value;
        else if (cmp > 0)
            root.left = this._put(root.left, key, value);
        else
            root.right = this._put(root.right, key, value);
        if (!this.isRED(root.left) && this.isRED(root.right))
            root = this.rotateLeft(root);
        if (root.left != null && this.isRED(root.left) && this.isRED(root.left.left))
            root = this.rotateRight(root);
        if (this.isRED(root.left) && this.isRED(root.right))
            this.flipColor(root);
        return root;
    }
    put(key, value) {
        this.root = this._put(this.root, key, value);
        this.root.color = Colors.BLACK;
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
    delete(key) {
        throw new Error('Method not implemented.');
    }
}
