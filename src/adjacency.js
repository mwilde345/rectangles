export class Adjacency {
    constructor(type, line) {
        this.type = type;
        this.line = line;
    }

    get type() {
        return this.type
    }

    get line() {
        return this.line
    }

    set type(type) {
        this.type = type;
    }

    set line(line) {
        this.line = line
    }
}