export class Result {
    constructor(object) {
        this.result = object || {}
    }

    addRelationship(source, target, value) {
        this.result[source][target] = value
        return this.result;
    }

    getRelationship(source, target) {
        return this.result[source][target]
    }
}