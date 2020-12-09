export const generateHash = (value: string, isPositive = true): number => {
  const hash = value.split('').reduce((accumulator, currentValue) => {
    // eslint-disable-next-line no-bitwise
    const next = (accumulator << 5) - accumulator + currentValue.charCodeAt(0);

    // eslint-disable-next-line no-bitwise
    return next & next;
  }, 0);

  return isPositive ? Math.abs(hash) : hash;
};
