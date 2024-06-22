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
  // if (desc.length > limit) {
  //   return `${desc.slice(0, limit).trim()}...`;
  // }

  // return desc;

  // Here i used the ternary operator rather than the If Else this is too much optimize and understandable than if else...
  desc.length > limit ? return `${desc.slice(0, limit).trim()}...` : return desc; 
};
