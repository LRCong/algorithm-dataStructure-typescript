import Graph, { Paths } from './Graph'

/**
 * 深度优先搜索实现的寻路算法类
 */
export default class DepethFirstPaths extends Paths {
    constructor(G: Graph, s: number) {
        super(G, s);
        this.G = G;
        this.s = s;
        this.edgeTo = new Array<number>(G.get_Vsum()).fill(-1);
        this.dfs(s);
    }

    private G: Graph;

    private s: number;

    private edgeTo: Array<number>;

    private dfs(v: number): void {
        for (let w of this.G.get_adj(v)) {
            if (this.edgeTo[w] === -1) {
                this.edgeTo[w] = v;
                this.dfs(v);
            }
        }
        return;
    }

    public hasPathTo(v: number): boolean {
        return v < this.G.get_Vsum() && this.edgeTo[v] >= 0;
    }

    public pathTo(v: number): number[] {
        if (!this.hasPathTo(v)) return null;
        let ret: Array<number> = [];
        for (let x = v; x != this.s; x = this.edgeTo[x]) ret.unshift(x);
        ret.push(this.s);
        return ret;
    }

}