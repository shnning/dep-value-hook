import { createContext } from 'react';
import { DepValue } from './useDepState';

export const DepValueContext = createContext<{
  depValueMap: Map<string, DepValue<any>> | undefined;
}>({
  depValueMap: undefined,
});
