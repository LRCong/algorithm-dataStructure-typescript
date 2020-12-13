/**
 * 希尔排序：改善插入排序对于大规模乱序数组的效率，已知最坏复杂度不超过N的平方
 * @param args 传入的数组
 * @param compare 比较数组元素的函数，正数表示大于，负数表示小于，0表示相等
 */
let shell_sort = function (args, compare) {
    let n = args.length;
    let h = 1;
    while (h < Math.floor(n / 3))
        h = h * 3 + 1;
    while (h >= 1) {
        for (let i = h; i < n; i++) {
            for (let j = i; j >= h && compare(args[j], args[j - h]) < 0; j -= h) {
                [args[j], args[j - h]] = [args[j - h], args[j]];
            }
        }
        h = Math.floor(h / 3);
    }
    return args;
};
shell_sort = function (args, compare) {
    let n = args.length;
    let h = 1;
    while (h < Math.floor(n / 3))
        h = h * 3 + 1;
    while (h >= 1) {
        for (let i = 0; i < h; i++) {
            for (let j = i + h; j < n; j += h) {
                let k = j;
                while (k >= h && compare(args[k - h], args[k]) > 0) {
                    [args[k - h], args[k]] = [args[k], args[k - h]];
                    k -= h;
                }
            }
        }
        h = Math.floor(h / 3);
    }
    return args;
};
console.log(shell_sort([3, 6, 1, 9, 4, 7, 3], (a, b) => a - b));
export default shell_sort;
