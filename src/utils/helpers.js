// Add our own debounce utility so we don’t need to load a lib.
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
