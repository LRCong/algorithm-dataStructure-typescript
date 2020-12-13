import Sort, { Comparator } from './Interface'

let partition = <T>(args: Array<T>, lo: number, hi: number, compare: Comparator<T>): number => {
    let tmp = args[lo], i = lo, j = hi;
    while (i < j) {
        while (j > i && compare(args[j], tmp) > 0) j--;
        if (j > i) [args[i], args[j]] = [args[j], args[i]];
        while (i < j && compare(args[i], tmp) <= 0) i++;
        if (i < j) [args[i], args[j]] = [args[j], args[i]];
    }
    [args[j], tmp] = [tmp, args[j]];
    return j;
}

let partition3way = <T>(args: Array<T>, lo: number, hi: number, compare: Comparator<T>): [number, number] => {
    let tmp = args[lo], lt = 0, i = 0, gt = hi;
    while (i <= gt) {
        let now = compare(args[i], tmp);
        if (now === 0) {
            i++;
        } else if (now > 0) {
            [args[gt], args[i]] = [args[i], args[gt]];
            gt--;
        } else {
            [args[lt], args[i]] = [args[i], args[lt]];
            lt++;
            i++;
        }
    }
    return [lt, gt];
}

let sort = <T>(args: Array<T>, lo: number, hi: number, compare: Comparator<T>): void => {
    if (lo >= hi) return;
    let ptr = partition(args, lo, hi, compare);
    sort(args, lo, ptr - 1, compare);
    sort(args, ptr + 1, hi, compare);
    return;
}

sort = <T>(args: Array<T>, lo: number, hi: number, compare: Comparator<T>): void => {
    if (lo >= hi) return;
    let ptr = partition3way(args, lo, hi, compare);
    sort(args, lo, ptr[0] - 1, compare);
    sort(args, ptr[1] + 1, hi, compare);
    return;
}

/**
 * 快速排序，适用性较好的排序方法，O(NlogN)复杂度
 * 改进方法：1. 对小数组切换到快速排序，2. 对大量重复元素的数组采用三向切分（重复部分不再继续排序）
 * @param args 传入的数组
 * @param compare 比较数组元素的函数，正数表示大于，负数表示小于，0表示相等
 */
let quick_sort: Sort = function <T>(args: Array<T>, compare: Comparator<T>): Array<T> {
    sort(args, 0, args.length - 1, compare);
    return args;
}

export default quick_sort