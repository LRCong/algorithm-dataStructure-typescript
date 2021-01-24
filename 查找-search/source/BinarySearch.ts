import ST, { Comparator } from './Interface'

/**
 * 实现二分查找的有序符号表
 * 有序符号表相比无序符号表，插入时间复杂度更长（O(n) > O(1)），但查找复杂度更短（O(logn) < o(n)）
 * 实例化时需要传入键和值的类型为泛型参数以及实现Comparator接口的比较器函数为参数
 */
export default class BinarySearchST<K, V> extends ST<K, V> {
    constructor(comparator: Comparator<K>) {
        super();
        this.comparator = comparator;
    }

    protected comparator: Comparator<K>;

    private keys: Array<K> = new Array<K>();

    private values: Array<V> = new Array<V>();

    private rank(key: K): number {
        let begin = 0, end = this.keys.length;
        while (begin <= end) {
            let mid = Math.floor((begin + end) / 2);
            if (this.comparator(this.keys[mid], key) < 0) begin = mid + 1;
            else if (this.comparator(this.keys[mid], key) > 0) end = mid - 1;
            else return mid;
        }
        return begin;
    }

    public put(key: K, value: V): boolean {
        let ptr = this.rank(key);
        if (this.comparator(this.keys[ptr], key) === 0) {
            this.values[ptr] = value;
            return true;
        }
        let n = this.keys.length, pre: [K, V] = [key, value];
        for (let i = ptr; i <= n; i++) {
            [pre[0], this.keys[i]] = [this.keys[i], pre[0]];
            [pre[1], this.values[i]] = [this.values[i], pre[1]];
        }
        return true;
    }

    public get(key: K): V | void {
        let ptr = this.rank(key);
        if (this.comparator(this.keys[ptr], key) === 0) return this.values[ptr];
        return;
    }

    public contains(key: K): boolean {
        let ptr = this.rank(key);
        if (this.comparator(this.keys[ptr], key) === 0) return true;
        return false;
    }

    public delete(key: K): V | void {
        let ptr = this.rank(key);
        if (this.comparator(this.keys[ptr], key) !== 0) return;
        this.keys.splice(ptr, 1);
        return this.values.splice(ptr, 1)[0];
    }

    public show() {
        let n = this.keys.length
        for (let i = 0; i < n; i++) {
            console.log([this.keys[i], this.values[i]]);
        }
    }
}