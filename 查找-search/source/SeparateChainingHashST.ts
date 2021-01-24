import ST from './Interface'

interface hashCode<K> {
    <K>(key: K): number;
}

/**
 * 拉链法的散列表
 */
export default class SeperateChainingHashSt<K, V> extends ST<K, V> {
    constructor(hashCode: hashCode<K>, n: number) {
        super();
        this.hashCode = hashCode;
        this.n = n;
        this.st = new Array(n).fill(0).map(() => new Array<[K, V]>());
    }

    private st: Array<Array<[K, V]>>;

    private hashCode: hashCode<K>;

    private n: number;

    public put(key: K, value: V): boolean {
        let hash = this.hashCode(key) % this.n;
        this.st[hash].push([key, value]);
        return true;
    }
    public get(key: K): void | V {
        let hash = this.hashCode(key) % this.n;
        let tmp = this.st[hash].find((value) => value[0] === key);
        return tmp === undefined ? undefined : tmp[1];
    }
    public contains(key: K): boolean {
        let hash = this.hashCode(key) % this.n;
        return this.st[hash].some((value) => value[0] === key);
    }
    public delete(key: K): void | V {
        let hash = this.hashCode(key) % this.n;
        let index = this.st[hash].findIndex(value => value[0] === key);
        if (index === -1) return;
        return this.st[hash].splice(index, 1)[0][1];
    }
}