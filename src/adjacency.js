export class Adjacency {
    constructor() {
        this.sub = []
        this.proper = []
        this.partial = []
    }

    get sub() {
        return this.sub
    }

    get proper() {
        return this.proper
    }

    get partial() {
        return this.partial
    }

    addSub(line) {
        this.sub = this.sub.push(line)
    }

    addProper(line) {
        this.proper = this.proper.push(line)
    }

    addPartial(line) {
        this.partial = this.partial.push(line)
    }
}