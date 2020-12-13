import Sort, { Comparator } from './Interface'

/**
 * 插入排序：可以充分利用已经排好序的部分
 * @param args 传入的数组
 * @param compare 比较数组元素的函数，正数表示大于，负数表示小于，0表示相等
 */
let insert_sort: Sort = function <T>(args: Array<T>, compare: Comparator<T>): Array<T> {
    let n = args.length;
    for (let i = 1; i < n; i++) {
        let j = i;
        while (j > 0 && compare(args[j - 1], args[j]) > 0) {
            [args[j - 1], args[j]] = [args[j], args[j - 1]];
            j--;
        }
    }
    return args;
}

export default insert_sort;