export function noop() { }
export function invariant(condition, msg) {
    if (!condition) {
        throw new Error('[DepValue warning]: ' + msg);
    }
}
