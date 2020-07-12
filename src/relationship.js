export class Relationship {
    constructor(adj, cont, inter){
        this.adjacency = adj;
        this.containment = cont;
        this.intersection = inter;
    }
    set adjacency(adj) {
        this.adjacency = adj;
    }

    set containment(cont) {
        this.containment = cont;
    }

    set intersection(inter) {
        this.intersection = inter;
    }

    get adjacency() {
        return this.adjacency;
    }

    get containment() {
        return this.containment;
    }

    get intersection() {
        return this.intersection
    }
}