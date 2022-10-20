import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from 'react';
import { DepValueContext } from './DepValueContext';
export function DepValueProvider({ children }) {
    const depValues = useRef(new Map());
    return (_jsx(DepValueContext.Provider, Object.assign({ value: { depValueMap: depValues.current } }, { children: children })));
}
