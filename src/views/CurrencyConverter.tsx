import { useListCountries } from "../api/hooks/useListCountries.ts";
import { useGetExchangeRate } from "../api/hooks/useGetExchangeRate.ts";

import type { ListCountriesResponse } from "../api/types/listCountries.ts";
import { Autocomplete } from "../components/Autocomplete.tsx";
import type { AutocompleteOption } from "../components/Autocomplete.tsx";
import { useState } from "react";
import { Typography } from "@mui/material";
import { CurrencyField } from "../components/CurrencyField.tsx";
import { cleanMaskedCurrency } from "../utils/cleanMaskedCurrency.ts";
import { useGetCurrencySymbol } from "../hooks/useGetCurrencySymbol.ts";

export const CurrencyConverter = () => {
  const [fromAmount, setFromAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState<AutocompleteOption>();
  const [toCurrency, setToCurrency] = useState<AutocompleteOption>();

  const { data: countries } = useListCountries();
  const { data: exchangeRates } = useGetExchangeRate({
    params: { currencyCode: fromCurrency?.value },
  });

  const uniqueCurrencies =
    countries?.reduce(
      (acc: AutocompleteOption[], cur: ListCountriesResponse[0]) => {
        if (cur.currencies) {
          Object.entries(cur.currencies).forEach(([code, details]) => {
            // Check if cur already exists in acc
            const exists = acc.some((item) => item.value === code);
            // if it isn't there, add it in
            if (!exists) {
              acc.push({
                label: `${code} - ${details.symbol} (${details.name})`,
                value: code,
              });
            }
          });
        }
        return acc;
      },
      [],
    ) ?? [];

  uniqueCurrencies.sort((a, b) => a.value.localeCompare(b.value));

  const exchangeRate = toCurrency?.value
    ? exchangeRates?.conversion_rates[toCurrency?.value]
    : undefined;
  const cleanFromAmount = cleanMaskedCurrency(fromAmount);
  const fromSymbol = useGetCurrencySymbol({ currency: fromCurrency?.value });
  const formattedToAmount = exchangeRate
    ? (cleanFromAmount * exchangeRate).toLocaleString(undefined, {
        style: "currency",
        currency: toCurrency?.value,
      })
    : "";

  return (
    <section
      style={{
        border: `1px solid black`,
        borderRadius: "10px",
        margin: "12px",
        width: "min-content",
      }}
    >
      <Typography component={"h1"} variant={"h3"}>
        Currency Converter
      </Typography>

      <CurrencyField
        value={fromAmount}
        onChange={setFromAmount}
        symbol={fromSymbol}
      />

      <Autocomplete
        label={"From"}
        options={uniqueCurrencies}
        value={fromCurrency}
        onChange={setFromCurrency}
      />
      <Autocomplete
        label={"To"}
        options={uniqueCurrencies}
        value={toCurrency}
        onChange={setToCurrency}
      />

      <Typography component={"p"}>
        Current conversion rate is: {exchangeRate}
      </Typography>
      <Typography component={"p"}>
        Converted amount is: {formattedToAmount}
      </Typography>
    </section>
  );
};
