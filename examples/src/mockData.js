const data = ["a", "b", "c", "d"];

export const getData = async (param = "") => {
  return data.map((char) => ({
    label: param + char,
    value: param + char,
  }));
};

export const getData2 = async (param) => {
  return param
    ? data.map((char) => ({
        label: param + char,
        value: param + char,
      }))
    : [];
};

export const getData3 = async (param) => {
  return param
    ? data.map((char) => ({
        label: param + char,
        value: param + char,
      }))
    : [];
};
