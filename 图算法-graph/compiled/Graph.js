/**
 * 无向图的邻接表实现
 */
export default class Graph {
    constructor(V) {
        this.V = V;
        this.E = 0;
        this.adj = new Array(V).fill(0).map(() => new Array());
    }
    get_Vsum() {
        return this.V;
    }
    get_Esum() {
        return this.E;
    }
    add_edge(v, w) {
        if (v >= this.V || w >= this.V) {
            return false;
        }
        this.adj[v].push(w);
        this.adj[w].push(v);
        this.E++;
        return true;
    }
    get_adj(v) {
        if (v >= this.V)
            return [];
        return this.adj[v];
    }
}
/**
 * 搜索算法抽象基类
 */
export class Search {
    constructor(G, s) { }
    ;
}
/**
 * 寻路算法抽象基类
 */
export class Paths {
    constructor(G, s) { }
}
