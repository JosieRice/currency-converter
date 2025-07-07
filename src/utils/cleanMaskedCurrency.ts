export const cleanMaskedCurrency = (value: string) =>
  Number(value.replace(/[^0-9.]/g, ""));
