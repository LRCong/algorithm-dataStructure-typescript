import { Comparator } from './Interface'
import heap_sort from './Heap'

class Heap<T> {
    private list: Array<T>;
    public length: number;
    private compare: Comparator<T>;

    constructor(compare: Comparator<T>) {
        this.list = new Array<T>();
        this.length = 0;
        this.compare = compare;
    }

    private sink(index: number): void {
        let left = index * 2 + 1, right = index * 2 + 2;
        let args = this.list;
        let n = this.length - 1;
        if (left > n) return;
        let maxSon = right >= n || this.compare(args[left], args[right]) > 0 ? left : right;
        if (this.compare(args[maxSon], args[index]) <= 0) return;
        [args[maxSon], args[index]] = [args[index], args[maxSon]];
        this.sink(maxSon);
    };

    private swim(index: number): void {
        let father = Math.floor((index + 1) / 2) - 1;
        if (father < 0) return;
        let args = this.list;
        let n = this.length - 1;
        if (this.compare(args[father], args[index]) >= 0) return;
        [args[father], args[index]] = [args[index], args[father]];
        this.swim(father);
    };

    public offer(a: T): void {
        this.list.push(a);
        this.length++;
        this.swim(this.length - 1);
    }

    public poll(): T | undefined {
        if (this.length === 0) return;
        [this.list[this.length - 1], this.list[0]] = [this.list[0], this.list[this.list.length - 1]];
        let tmp = this.list.pop();
        this.length--;
        this.sink(0);
        return tmp;
    }

    public sort(): Array<T> {
        return heap_sort(Array.from(this.list), this.compare);
    }

    public print() {
        console.log(this.list);
    }
}

