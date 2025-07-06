import type { ListCountriesResponse } from "../types/listCountries.ts";

export const listCountries = async (): Promise<ListCountriesResponse> => {
  const url = `https://restcountries.com/v3.1/all?fields=name,flags,currencies`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status.toString()}`);
  }
  return (await response.json()) as ListCountriesResponse;
};
