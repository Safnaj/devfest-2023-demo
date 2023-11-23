export const currencyFormatter = (amount) => {
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
};
