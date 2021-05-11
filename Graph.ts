export default class Graph<T> {
    private readonly _nodes: T[] = [];
    private readonly _edges: [number, number][] = [];

    public connect(a: T, b: T) {
        let aIndex = this._nodes.indexOf(a);
        let bIndex = this._nodes.indexOf(b);
        if (aIndex === -1) {
            aIndex = this._nodes.length;
            this._nodes.push(a);
        }
        if (bIndex === -1) {
            bIndex = this._nodes.length;
            this._nodes.push(b);
        }

        if (this._edges.find(([a, b]) => (a === aIndex && b === bIndex) || (a === bIndex && b === aIndex))) return;

        this._edges.push([aIndex, bIndex]);
    }

    public connectMany(...nodes: T[]) {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                this.connect(nodes[i], nodes[j]);
            }
        }
    }

    public connectedNodesWhere(predicate: (a: T, b: T) => boolean) {
        const matchingNodes = new Set<T>();
        for (let i = 0; i < this._edges.length; i++) {
            const [aIndex, bIndex] = this._edges[i];
            if (predicate(this._nodes[aIndex], this._nodes[bIndex])) {
                matchingNodes.add(this._nodes[aIndex]);
                matchingNodes.add(this._nodes[bIndex]);
            }
        }
        return matchingNodes;
    }
}