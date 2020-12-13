/**
 * 比较函数接口
 */
export interface Comparator<T> {
    (a: T, b: T): number;
}

/**
 * 排序函数接口，需要传入待排序数组和比较函数
 */
export default interface Sort {
    <T>(args: Array<T>, compare: Comparator<T>): Array<T>;
}