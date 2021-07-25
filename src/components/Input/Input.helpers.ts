export const isNumber = (value: string) => {
  return !Number.isNaN(Number(value));
};

export const isEqualOrLess = (value: string, compareNum: number) => {
  const num = Number(value);

  if (Number.isNaN(num)) return true;

  return num <= compareNum;
};
