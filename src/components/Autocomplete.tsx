import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AutocompleteMUI from "@mui/material/Autocomplete";
import type { Dispatch, SetStateAction } from "react";

export type AutocompleteOption = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  options: AutocompleteOption[];
  value?: AutocompleteOption;
  onChange: Dispatch<SetStateAction<AutocompleteOption | undefined>>;
};

export const Autocomplete = ({ options, label, value, onChange }: Props) => {
  return (
    <FormControl sx={{ width: "100%", margin: "16px" }}>
      <AutocompleteMUI
        disablePortal
        renderInput={(params) => (
          <TextField {...params} sx={{ color: "black" }} label={label} />
        )}
        options={options}
        sx={{ backgroundColor: "white", color: "black", width: 500 }}
        size={"small"}
        value={value}
        onChange={(_, value) => {
          if (!value) {
            onChange(undefined);
            return;
          }
          onChange(value);
        }}
      />
    </FormControl>
  );
};
