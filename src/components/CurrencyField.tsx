import type { Dispatch, SetStateAction } from "react";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { NumericFormat } from "react-number-format";

type Props = {
  onChange: Dispatch<SetStateAction<string>>;
  symbol?: string;
  value: string;
};

/**
 * This is a currency field that takes a string and returns a string. combine it with `cleanMaskedCurrency` to get a number without the formatting
 *
 * @param value
 * @param onChange
 * @param symbol
 * @constructor
 */
export const CurrencyField = ({ onChange, symbol, value }: Props) => {
  return (
    <FormControl sx={{ margin: "16px", width: "100%" }}>
      <NumericFormat
        allowLeadingZeros
        customInput={TextField}
        decimalScale={2}
        label={"Amount"}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        prefix={symbol ? ` ${symbol} ` : ""}
        size={"small"}
        sx={{ width: 500 }}
        thousandSeparator
        value={value}
      />
    </FormControl>
  );
};
