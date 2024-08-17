export const getFinalPrice = (price: number, discount: number) => {
  return (price - (price * discount) / 100).toFixed();
};
