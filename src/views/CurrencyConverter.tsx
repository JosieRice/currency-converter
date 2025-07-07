import { Typography } from "@mui/material";
import { useMemo, useState } from "react";

import type { ListCountriesResponse } from "../api/types/listCountries.ts";
import type { AutocompleteOption } from "../components/Autocomplete.tsx";

import { useGetExchangeRate } from "../api/hooks/useGetExchangeRate.ts";
import { useListCountries } from "../api/hooks/useListCountries.ts";
import { Autocomplete } from "../components/Autocomplete.tsx";
import { CurrencyField } from "../components/CurrencyField.tsx";
import { useGetCurrencySymbol } from "../hooks/useGetCurrencySymbol.ts";
import { cleanMaskedCurrency } from "../utils/cleanMaskedCurrency.ts";

export const CurrencyConverter = () => {
  const [fromAmount, setFromAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState<AutocompleteOption>();
  const [toCurrency, setToCurrency] = useState<AutocompleteOption>();

  const { data: countries } = useListCountries();
  const { data: exchangeRates } = useGetExchangeRate({
    params: { currencyCode: fromCurrency?.value },
  });

  const uniqueCurrencies =
    useMemo(
      () =>
        countries?.reduce(
          (acc: AutocompleteOption[], cur: ListCountriesResponse[0]) => {
            Object.entries(cur.currencies).forEach(([code, details]) => {
              // Check if cur already exists in acc
              const exists = acc.some((item) => item.value === code);
              // if it isn't there, add it in
              if (!exists) {
                acc.push({
                  label: `${code} - ${details?.symbol ?? ""} (${details?.name ?? ""})`,
                  value: code,
                });
              }
            });

            return acc;
          },
          [],
        ),
      [countries],
    ) ?? [];

  uniqueCurrencies.sort((a, b) => a.value.localeCompare(b.value));

  const exchangeRate = toCurrency?.value
    ? exchangeRates?.conversion_rates[toCurrency.value]
    : undefined;
  const cleanFromAmount = cleanMaskedCurrency(fromAmount);
  const fromSymbol = useGetCurrencySymbol({ currency: fromCurrency?.value });
  const formattedToAmount = exchangeRate
    ? (cleanFromAmount * exchangeRate).toLocaleString(undefined, {
        currency: toCurrency?.value,
        style: "currency",
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
        onChange={setFromAmount}
        symbol={fromSymbol}
        value={fromAmount}
      />

      <Autocomplete
        label={"From"}
        onChange={setFromCurrency}
        options={uniqueCurrencies}
        value={fromCurrency}
      />
      <Autocomplete
        label={"To"}
        onChange={setToCurrency}
        options={uniqueCurrencies}
        value={toCurrency}
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
