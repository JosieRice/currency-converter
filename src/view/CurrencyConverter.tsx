import { useListCountries } from "../api/hooks/useListCountries.ts";

export const CurrencyConverter = () => {
  const { data } = useListCountries();

  console.log({ data });

  return <div>currency converter</div>;
};
