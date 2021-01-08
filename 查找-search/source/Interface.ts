/**
 * 比较函数接口
 */
export interface Comparator<T> {
    (a: T, b: T): number;
}

export default abstract class SearchTable<K, V> {
    constructor(comparator: Comparator<K>) {
        this.comparator = comparator;
    }

    protected comparator: Comparator<K>;

    public abstract put(key: K, value: V): boolean;

    public abstract get(key: K): V | void;

    public abstract contains(key: K): boolean;

    public abstract delete(key: K): V | void;
}