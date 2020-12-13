import Sort, { Comparator } from './Interface'

/**
 * 选择排序：一种排列排好序数组和随机数组都需要相同时间的排序方法
 * @param args 传入的数组
 * @param compare 比较数组元素的函数，正数表示大于，负数表示小于，0表示相等
 */
let select_sort: Sort = function <T>(args: Array<T>, compare: Comparator<T>): Array<T> {
    let n = args.length;
    for (let i = 0; i < n; i++) {
        let min = i;
        for (let j = i + 1; j < n; j++)
            if (compare(args[min], args[j]) > 0)
                min = j;
        [args[min], args[i]] = [args[i], args[min]];
    }
    return args;
}

export default select_sort