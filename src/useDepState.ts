import { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { DepValueContext } from './DepValueContext';
import { DepStateParams, Options } from './types';
import { invariant, noop } from './utils';

function useForceRender() {
  const [, setValue] = useState({});

  return useCallback(() => {
    setValue({});
  }, []);
}

export function useDepState<T>({
  defaultValue,
  name,
  prevDepName,
  nextDepName,
  effect,
}: DepStateParams<T>) {
  const { depValueMap } = useContext(DepValueContext);

  invariant(!!depValueMap, 'Expected depValue context here');

  const depValueRef = useRef<DepValue<T>>(
    new DepValue(defaultValue, name, depValueMap!, {
      prevDepName,
      nextDepName,
      effect,
    })
  );
  const forceRender = useForceRender();

  useEffect(() => {
    depValueMap!.set(name, depValueRef.current);
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

export class DepValue<T> {
  private _value: T;
  defaultValue: T;
  depValueMap: Map<string, DepValue<any>>;
  prevDepName = '';
  nextDepName = '';
  name = '';
  public effect: (value: T) => void = noop;

  constructor(
    value: T,
    name: string,
    depValueMap: Map<string, DepValue<any>>,
    options: Options<T>
  ) {
    this._value = this.defaultValue = value;
    this.name = name;
    this.depValueMap = depValueMap;

    if (options?.prevDepName) {
      this.prevDepName = options.prevDepName;
    }
    if (options?.nextDepName) {
      this.nextDepName = options.nextDepName;
    }
    if (options?.effect) {
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
      currDep = prevDep as typeof this;
      prevDep = this.depValueMap.get(currDep.prevDepName);
    }

    if (currDep.value) {
      return '';
    }
    return currDep.name;
  }
}

function triggerEffect(depValue: DepValue<any>, value) {
  depValue.effect?.(value)
  const childDepValue = depValue.depValueMap.get(depValue.nextDepName)
  if(childDepValue) {
    childDepValue.value = childDepValue.defaultValue
  }
}
