import { useQuery } from "@tanstack/react-query";

import { listCountries } from "../client/listCountries.ts";

export const useListCountries = () => {
  return useQuery({
    queryFn: () => listCountries(),
    queryKey: ["countries"],
  });
};
