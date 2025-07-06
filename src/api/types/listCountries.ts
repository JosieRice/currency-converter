export type ListCountriesResponse = {
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

type NativeName = {
  fra: { official: string; common: string };
};
