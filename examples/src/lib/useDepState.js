import { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { DepValueContext } from './DepValueContext';
import { invariant, noop } from './utils';
function useForceRender() {
    const [, setValue] = useState({});
    return useCallback(() => {
        setValue({});
    }, []);
}
export function useDepState({ defaultValue, name, prevDepName, nextDepName, effect, }) {
    const { depValueMap } = useContext(DepValueContext);
    invariant(!!depValueMap, 'Expected depValue context here');
    const depValueRef = useRef(new DepValue(defaultValue, name, depValueMap, {
        prevDepName,
        nextDepName,
        effect,
    }));
    const forceRender = useForceRender();
    useEffect(() => {
        depValueMap.set(name, depValueRef.current);
    }, []);
    return [
        depValueRef.current.value,
        (newValue) => {
            depValueRef.current.value = newValue;
            forceRender();
        },
        () => depValueRef.current.missingDepName,
    ];
}
export class DepValue {
    constructor(value, name, depValueMap, options) {
        this.prevDepName = '';
        this.nextDepName = '';
        this.name = '';
        this.effect = noop;
        this._value = this.defaultValue = value;
        this.name = name;
        this.depValueMap = depValueMap;
        if (options === null || options === void 0 ? void 0 : options.prevDepName) {
            this.prevDepName = options.prevDepName;
        }
        if (options === null || options === void 0 ? void 0 : options.nextDepName) {
            this.nextDepName = options.nextDepName;
        }
        if (options === null || options === void 0 ? void 0 : options.effect) {
            this.effect = options.effect;
        }
    }
    get value() {
        return this._value;
    }
    set value(newValue) {
        if (this._value !== newValue) {
            this._value = newValue;
            triggerEffect(this, newValue);
        }
    }
    get missingDepName() {
        let currDep = this;
        let prevDep = this.depValueMap.get(currDep.prevDepName);
        while (prevDep && currDep) {
            if (prevDep.value && !currDep.value) {
                return currDep.name;
            }
            currDep = prevDep;
            prevDep = this.depValueMap.get(currDep.prevDepName);
        }
        if (currDep.value) {
            return '';
        }
        return currDep.name;
    }
}
function triggerEffect(depValue, value) {
    var _a;
    (_a = depValue.effect) === null || _a === void 0 ? void 0 : _a.call(depValue, value);
    const childDepValue = depValue.depValueMap.get(depValue.nextDepName);
    if (childDepValue) {
        childDepValue.value = childDepValue.defaultValue;
    }
}
