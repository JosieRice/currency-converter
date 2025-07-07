export type ListCountriesResponse = {
  flags: Flag;
  name: Name;
  currencies: Currency;
}[];

type Flag = {
  alt: string;
  png: string;
  svg: string;
};

type Name = {
  common: string;
  nativeName: NativeName;
  official: string;
};

type NativeName = {
  fra: { official: string; common: string };
};

export type Currency = Record<string, { name: string; symbol: string }>;
