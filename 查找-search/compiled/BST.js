"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Interface_1 = __importDefault(require("./Interface"));
class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class BST extends Interface_1.default {
    constructor(comparator) {
        super(comparator);
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
    min(root) {
        if (root === null)
            return null;
        if (root.left === null)
            return root;
        return this.min(root.left);
    }
    deleteMin(root) {
        if (root.left === null)
            return root.right;
        root.left = this.deleteMin(root.left);
        return root;
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
            let n = this.min(root.right);
            n.right = this.deleteMin(root.right);
            n.left = root.left;
            root = n;
        }
        return root;
    }
    delete(key) {
        this.root = this._delete(this.root, key);
    }
}
exports.default = BST;
let bst = new BST((a, b) => a - b);
bst.put(2, 'java');
bst.put(24, 'python');
bst.put(15, 'c++');
bst.put(17, 'js');
bst.delete(15);
console.log(bst.get(24));
