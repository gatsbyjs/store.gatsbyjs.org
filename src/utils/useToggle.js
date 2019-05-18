import { useState } from 'react';

/**
 * Returns a boolean and a function to toggle the value.
 * The initial value is set to false.
 * @returns [toggleValue, setToggleValue]
 */
export const useToggle = () => {
  const [value, setValue] = useState(false);

  const toggleValue = () => {
    setValue(!value);
  };

  return [value, toggleValue];
};

export default useToggle;
