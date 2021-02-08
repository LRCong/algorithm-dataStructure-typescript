import Graph, { Search } from './Graph';

/**
 * 深度优先算法实现的搜索算法类
 */
export default class DepthFirstSearch extends Search {
    constructor(G: Graph, s: number) {
        super(G, s);
        if (s >= G.get_Vsum()) throw Error('no this vertice');
        this.marked_list = new Array(G.get_Vsum()).fill(false);
        this.count_num = -1;
        this.dfs(G, s);
    }

    private marked_list: Array<boolean>;

    private count_num: number;

    private dfs(G: Graph, v: number): void {
        if (v >= G.get_Vsum()) return;
        this.marked_list[v] = true;
        this.count_num++;
        for (let w of G.get_adj(v))
            if (!this.marked_list[w]) this.dfs(G, w);
        return;
    }

    public marked(v: number): boolean {
        return v < this.marked_list.length && this.marked_list[v];
    }

    public count(): number {
        return this.count_num;
    }
}