/**
 * for removing everything that isn't a number or a `.`
 * @param value
 */
export const cleanMaskedCurrency = (value: string) =>
  Number(value.replace(/[^0-9.]/g, ""));
