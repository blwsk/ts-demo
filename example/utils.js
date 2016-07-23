// @flow

function uniqueIdGenerator() {
  let current = 0;

  return function(key) {
    current += 1;

    if (key) {
      return `${key}.${current}`;
    }

    return `${current}`;
  }
}

export const uniqueId = uniqueIdGenerator();
