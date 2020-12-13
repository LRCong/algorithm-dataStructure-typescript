import Sort, { Comparator } from './Interface'

let sink = <T>(args: Array<T>, index: number, compare: Comparator<T>, n: number): void => {
    let left = index * 2 + 1, right = index * 2 + 2;
    if (left > n) return;
    let maxSon = right >= n || compare(args[left], args[right]) > 0 ? left : right;
    if (compare(args[maxSon], args[index]) <= 0) return;
    [args[maxSon], args[index]] = [args[index], args[maxSon]];
    sink(args, maxSon, compare, n);
}

let heap_sort: Sort = <T>(args: Array<T>, compare: Comparator<T>): Array<T> => {
    let n = args.length - 1;
    for (let i = n; i >= 0; i--)
        sink(args, i, compare, n);
    while (n >= 0) {
        [args[n], args[0]] = [args[0], args[n]];
        n--;
        sink(args, 0, compare, n);
    }
    return args;
}

export default heap_sort;