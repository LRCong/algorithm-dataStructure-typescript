import ST from './Interface';

interface hashCode<K> {
    <K>(key: K): number;
}

/**
 * 线性再探测法的散列表
 */
export default class LinearProbingHashST<K, V> extends ST<K, V> {
    public put(key: K, value: V): boolean {
        throw new Error('Method not implemented.');
    }
    public get(key: K): void | V {
        throw new Error('Method not implemented.');
    }
    public contains(key: K): boolean {
        throw new Error('Method not implemented.');
    }
    public delete(key: K): void | V {
        throw new Error('Method not implemented.');
    }

}