export class Relationship {
    constructor(adj, cont, inter){
        this._adjacency = adj;
        this._containment = cont;
        this._intersection = inter;
    }
    set adjacency(adj) {
        this._adjacency = adj;
    }

    set containment(cont) {
        this._containment = cont;
    }

    set intersection(inter) {
        this._intersection = inter;
    }

    get adjacency() {
        return this._adjacency;
    }

    get containment() {
        return this._containment;
    }

    get intersection() {
        return this._intersection
    }
}