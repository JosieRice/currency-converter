export type ListCountriesResponse = {
  currencies: Currency;
  flags: Flag;
  name: Name;
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

type NativeName = Record<string, { common: string; official: string }>;

export type Currency = Partial<
  Record<string, { name: string; symbol: string }>
>;
