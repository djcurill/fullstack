const randomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const choice = (arr) => {
  const idx = randomInt(arr.length);
  return arr[idx];
};

const argMax = (arr) => {
  if (arr.length === 0) return -1;

  let max = arr[0];
  let maxIdx = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
      maxIdx = i;
    }
  }
  return maxIdx;
};

export { randomInt, choice, argMax };
