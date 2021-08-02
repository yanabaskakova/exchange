// Just for fun :)
export const memoizeInTime = <T>(cb: () => Promise<T> | T, time = 2000) => {
  let callTime: number;
  let result: T;
  return async (...args: any) => {
    if (result && Date.now() < callTime + time) return result;

    const response = cb.apply(this, args as any);

    result = response instanceof Promise ? await response : response;
    callTime = Date.now();

    return result;
  };
};
