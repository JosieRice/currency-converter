import { useListCountries } from "../api/hooks/useListCountries.ts";
import { useGetExchangeRate } from "../api/hooks/useGetExchangeRate.ts";

export const CurrencyConverter = () => {
  const { data: countries } = useListCountries();
  const { data: exchangeRates } = useGetExchangeRate({
    params: { currencyCode: "USD" },
  });

  return (
    <div>
      <p>currency converter</p>
      <p>{countries?.length} countries</p>
      <p>{exchangeRates?.base_code} data is queried</p>
    </div>
  );
};
