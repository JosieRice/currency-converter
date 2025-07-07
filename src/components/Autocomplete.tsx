import type { Dispatch, SetStateAction } from "react";

import AutocompleteMUI from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

export type AutocompleteOption = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  onChange: Dispatch<SetStateAction<AutocompleteOption | undefined>>;
  options: AutocompleteOption[];
  value?: AutocompleteOption;
};

export const Autocomplete = ({ label, onChange, options, value }: Props) => {
  return (
    <FormControl sx={{ margin: "16px", width: "100%" }}>
      <AutocompleteMUI
        disablePortal
        onChange={(_, value) => {
          if (!value) {
            onChange(undefined);
            return;
          }
          onChange(value);
        }}
        options={options}
        renderInput={(params) => (
          <TextField {...params} label={label} sx={{ color: "black" }} />
        )}
        size={"small"}
        sx={{ backgroundColor: "white", color: "black", width: 500 }}
        value={value}
      />
    </FormControl>
  );
};
