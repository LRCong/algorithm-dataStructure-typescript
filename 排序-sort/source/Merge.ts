import Sort, { Comparator } from './Interface'

let merge = <T>(args: Array<T>, lo: number, hi: number, mid: number, compare: Comparator<T>): void => {
    let n = hi - lo + 1, i = lo, j = mid + 1, index = 0;
    let tmp = new Array<T>(n);
    while (index < n) {
        if ((i <= mid && compare(args[i], args[j]) <= 0)
            || j > hi) {
            tmp[index] = args[i];
            i++;
        } else {
            tmp[index] = args[j];
            j++;
        }
        index++;
    }
    args.splice(lo, n, ...tmp);
    return;
}

let sort = <T>(args: Array<T>, lo: number, hi: number, compare: Comparator<T>): void => {
    if (lo >= hi) return;
    let mid = Math.floor((lo + hi) / 2);
    sort<T>(args, lo, mid, compare);
    sort<T>(args, mid + 1, hi, compare);
    merge<T>(args, lo, hi, mid, compare);
    return;
}

/**
 * 归并排序 分自底向上与自顶向下两种，复杂度为O(NlogN)，比较次数不超过6NlogN
 * @param args 传入的数组
 * @param compare 比较数组元素的函数，正数表示大于，负数表示小于，0表示相等
 */
let merge_sort: Sort = function <T>(args: Array<T>, compare: Comparator<T>): Array<T> {
    let n = args.length;
    for (let sz = 1; sz < n; sz += sz) {
        for (let lo = 0; lo < n - sz; lo += sz + sz)
            merge<T>(args, lo, Math.min(lo + sz + sz - 1, n - 1), lo + sz - 1, compare);
    }
    return args;
}

merge_sort = function <T>(args: Array<T>, compare: Comparator<T>): Array<T> {
    sort<T>(args, 0, args.length - 1, compare);
    return args;
}

console.log(merge_sort([3, 6, 1, 4, 9, 5, 8, 3], (a, b) => a - b));

export default merge_sort