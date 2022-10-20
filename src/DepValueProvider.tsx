import { useRef } from 'react';
import { DepValueContext } from './DepValueContext';

export function DepValueProvider({ children }) {
  const depValues = useRef(new Map());

  return (
    <DepValueContext.Provider value={{ depValueMap: depValues.current }}>
      {children}
    </DepValueContext.Provider>
  );
}
