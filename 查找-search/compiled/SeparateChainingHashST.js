import ST from './Interface';
export default class SeperateChainingHashSt extends ST {
    constructor(hashCode, n) {
        super();
        this.hashCode = hashCode;
        this.n = n;
        this.st = new Array(n).fill(0).map(() => new Array());
    }
    put(key, value) {
        let hash = this.hashCode(key) % this.n;
        this.st[hash].push([key, value]);
        return true;
    }
    get(key) {
        let hash = this.hashCode(key) % this.n;
        let tmp = this.st[hash].find((value) => value[0] === key);
        return tmp === undefined ? undefined : tmp[1];
    }
    contains(key) {
        let hash = this.hashCode(key) % this.n;
        return this.st[hash].some((value) => value[0] === key);
    }
    delete(key) {
        let hash = this.hashCode(key) % this.n;
        let index = this.st[hash].findIndex(value => value[0] === key);
        if (index === -1)
            return;
        return this.st[hash].splice(index, 1)[0][1];
    }
}
