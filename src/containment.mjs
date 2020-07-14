export class Containment {
    constructor(contains,parent, child) {
        this._contains = contains;
        this._parent = parent;
        this._child = child;
    }
    set contains(contains) {
        this._contains = contains;
    }
    get contains() {
        return this._contains
    }
    set parent(parent) {
        this._parent = parent;
    }
    set child(child) {
        this._child = child;
    }
    get parent() {
        return this._parent
    }
    get child() {
        return this._child
    }
}