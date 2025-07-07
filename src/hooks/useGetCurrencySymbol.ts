import { useListCountries } from "../api/hooks/useListCountries.ts";

type Args = {
  currency?: string;
};

/**
 * give it a currency and get the currencies' symbol
 *
 * @param currency
 */
export const useGetCurrencySymbol = ({ currency }: Args) => {
  const { data: countries } = useListCountries();

  if (!currency) return;

  return countries?.find((country) => country.currencies[currency])?.currencies[
    currency
  ].symbol;
};
