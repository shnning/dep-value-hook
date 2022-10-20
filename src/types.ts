export type Options<T> = {
  prevDepName?: string;
  nextDepName?: string;
  effect?: (value: T) => void;
};

export type DepStateParams<T> = {
  defaultValue: T;
  name: string;
  prevDepName?: string;
  nextDepName?: string;
  effect?: (value: T) => void;
};
