"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Interface_1 = __importDefault(require("./Interface"));
class BinarySearchST extends Interface_1.default {
    constructor(comparator) {
        super(comparator);
        this.keys = new Array();
        this.values = new Array();
    }
    rank(key) {
        let begin = 0, end = this.keys.length;
        while (begin <= end) {
            let mid = Math.floor((begin + end) / 2);
            if (this.comparator(this.keys[mid], key) < 0)
                begin = mid + 1;
            else if (this.comparator(this.keys[mid], key) > 0)
                end = mid - 1;
            else
                return mid;
        }
        return begin;
    }
    put(key, value) {
        let ptr = this.rank(key);
        if (this.comparator(this.keys[ptr], key) === 0) {
            this.values[ptr] = value;
            return true;
        }
        let n = this.keys.length, pre = [key, value];
        for (let i = ptr; i <= n; i++) {
            [pre[0], this.keys[i]] = [this.keys[i], pre[0]];
            [pre[1], this.values[i]] = [this.values[i], pre[1]];
        }
        return true;
    }
    get(key) {
        let ptr = this.rank(key);
        if (this.comparator(this.keys[ptr], key) === 0)
            return this.values[ptr];
        return;
    }
    contains(key) {
        let ptr = this.rank(key);
        if (this.comparator(this.keys[ptr], key) === 0)
            return true;
        return false;
    }
    delete(key) {
        let ptr = this.rank(key);
        if (this.comparator(this.keys[ptr], key) !== 0)
            return;
        this.keys.splice(ptr, 1);
        return this.values.splice(ptr, 1)[0];
    }
    show() {
        let n = this.keys.length;
        for (let i = 0; i < n; i++) {
            console.log([this.keys[i], this.values[i]]);
        }
    }
}
