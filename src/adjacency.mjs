export class Adjacency {
    constructor() {
        this._sub = []
        this._proper = []
        this._partial = []
    }

    get sub() {
        return this._sub
    }

    get proper() {
        return this._proper
    }

    get partial() {
        return this._partial
    }

    addSub(line) {
        this._sub.push(line)
    }

    addProper(line) {
        this._proper.push(line)
    }

    addPartial(line) {
        this._partial.push(line)
    }
}