export function noop() {}

export function invariant(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error('[DepValue warning]: ' + msg);
  }
}
