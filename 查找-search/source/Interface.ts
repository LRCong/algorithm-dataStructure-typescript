/**
 * 比较函数接口
 */
export interface Comparator<T> {
    (a: T, b: T): number;
}

/**
 * 搜索符号表抽象基类
 * 定义了四个基本抽象方法：put，get，contians，delete
 */
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