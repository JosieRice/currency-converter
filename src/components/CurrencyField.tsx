import TextField from "@mui/material/TextField";
import { NumericFormat } from "react-number-format";
import type { Dispatch, SetStateAction } from "react";
import FormControl from "@mui/material/FormControl";

type Props = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  symbol?: string;
};

/**
 * This is a currency field that takes a string and returns a string. combine it with `cleanMaskedCurrency` to get a number without the formatting
 *
 * @param value
 * @param onChange
 * @param symbol
 * @constructor
 */
export const CurrencyField = ({ value, onChange, symbol }: Props) => {
  return (
    <FormControl sx={{ width: "100%", margin: "16px" }}>
      <NumericFormat
        customInput={TextField}
        value={value}
        allowLeadingZeros
        decimalScale={2}
        thousandSeparator
        onChange={(event) => onChange(event.target.value)}
        label={"Amount"}
        size={"small"}
        sx={{ width: 500 }}
        prefix={` ${symbol} `}
      />
    </FormControl>
  );
};
