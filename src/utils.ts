function uniqueIdGenerator<Function>() {
  let current = 0;
  return function<int>(key?: string) {
    current += 1;

    if (key) {
      return `${key}.${current}`;
    }

    return `${current}`;
  }
}

export const uniqueId: Function = uniqueIdGenerator();
