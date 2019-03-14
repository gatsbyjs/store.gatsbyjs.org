export const debounce = (delay, fn) => {
  let timeout;

  return function(...args) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fn(...args);
      timeout = null;
    }, delay);
  };
};

export const removeCareInstructions = desc =>
  desc
    .split(/Care Instructions/)
    .slice(0, 1)
    .join('');

export const cutDescriptionShort = (desc, limit) => {
  if (desc.length > limit) {
    return `${desc.slice(0, limit).trim()}...`;
  }

  return desc;
};
