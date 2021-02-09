import Graph, { Paths } from './Graph'

export default class BreadthFirstPaths extends Paths {
    constructor(G: Graph, s: number) {
        super(G, s);
        this.G = G;
        this.s = s;
        this.edgeTo = new Array<number>(this.G.get_Vsum()).fill(-1);
        this.edgeTo[s] = 0;
    }

    private G: Graph;

    private s: number;

    private edgeTo: Array<number>;

    private bfs(): void {
        let queue = new Array<number>();
        queue.push(this.s);
        while (queue.length > 0) {
            let v = queue.shift();
            for (let w of this.G.get_adj(v))
                if (this.edgeTo[w] === -1) {
                    queue.push(w);
                    this.edgeTo[w] = v;
                }
        }
    }

    public hasPathTo(v: number): boolean {
        return v < this.G.get_Vsum() && this.edgeTo[v] >= 0;
    }

    public pathTo(v: number): number[] {
        if (!this.hasPathTo(v)) return null;
        let ret = new Array<number>();
        for (let x = v; x != this.s; x = this.edgeTo[x]) ret.unshift(x);
        ret.unshift(this.s);
        return ret;
    }
}