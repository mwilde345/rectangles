export class Result {
    constructor(object) {
        this._result = object || {}
    }

    get result() {
        return this._result;
    }

    addRelationship(source, target, value) {
        if (this._result[source]) {
            this._result[source][target] = value 
        } else {
            this._result[source] = {
                [target]: value
            }
        }
        return this._result;
    }

    getRelationship(source, target) {
        return this._result[source][target]
    }
}