export const deepclone = (target) => {
  let value;
  let key;

  const clonedTarget = Array.isArray(target) ? [] : {};

  for (key in target) {
    value = target[key];
    clonedTarget[key] = (typeof value === 'object') ? deepclone(value) : value;
  }

  return clonedTarget;
};