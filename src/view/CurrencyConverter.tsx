import { useListCountries } from "../api/hooks/useListCountries.ts";

export const CurrencyConverter = () => {
  const { data } = useListCountries();

  const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

  console.log({ data, apiKey });

  return <div>currency converter</div>;
};
