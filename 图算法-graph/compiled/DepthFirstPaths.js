import { Paths } from './Graph';
/**
 * 深度优先搜索实现的寻路算法类
 */
export default class DepethFirstPaths extends Paths {
    constructor(G, s) {
        super(G, s);
        this.G = G;
        this.s = s;
        this.edgeTo = new Array(G.get_Vsum()).fill(-1);
        this.dfs(s);
    }
    dfs(v) {
        for (let w of this.G.get_adj(v)) {
            if (this.edgeTo[w] === -1) {
                this.edgeTo[w] = v;
                this.dfs(v);
            }
        }
        return;
    }
    hasPathTo(v) {
        return v < this.G.get_Vsum() && this.edgeTo[v] >= 0;
    }
    pathTo(v) {
        if (!this.hasPathTo(v))
            return null;
        let ret = [];
        for (let x = v; x != this.s; x = this.edgeTo[x])
            ret.unshift(x);
        ret.push(this.s);
        return ret;
    }
}
