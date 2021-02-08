/**
 * 无向图的邻接表实现
 */
export default class Graph {
    constructor(V: number) {
        this.V = V;
        this.E = 0;
        this.adj = new Array(V).fill(0).map(() => new Array());
    }

    private V: number;  // 顶点数

    private E: number;  // 边数

    private adj: Array<Array<number>>;  // 邻接表

    public get_Vsum(): number {
        return this.V;
    }

    public get_Esum(): number {
        return this.E;
    }

    public add_edge(v: number, w: number): boolean {
        if (v >= this.V || w >= this.V) {
            return false;
        }
        this.adj[v].push(w);
        this.adj[w].push(v);
        this.E++;
        return true;
    }

    public get_adj(v: number): Array<number> {
        if (v >= this.V) return [];
        return this.adj[v];
    }
}

/**
 * 搜索算法抽象基类
 */
export abstract class Search {
    constructor(G: Graph, s: number) { };

    public abstract marked(v: number): boolean;

    public abstract count(): number;
}

/**
 * 寻路算法抽象基类
 */
export abstract class Paths {
    constructor(G: Graph, s: number) { }

    public abstract hasPathTo(v: number): boolean;

    public abstract pathTo(v: number): Array<number>;
}
