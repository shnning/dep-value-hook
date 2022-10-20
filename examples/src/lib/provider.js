import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useRef } from "react";
export const DepValueContext = createContext({
    depValues: undefined,
});
export function DepValueProvider({ children }) {
    const depValues = useRef(new Map());
    return (_jsx(DepValueContext.Provider, Object.assign({ value: { depValues: depValues.current } }, { children: children })));
}
