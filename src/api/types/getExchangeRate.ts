export type ExchangeRateParams = {
  currencyCode?: string;
};

export type ExchangeRateResponse = {
  base_code: string;
  conversion_rates: Record<string, number>;
  documentation: string;
  result: string; // TODO: could tighten up to a discriminating string union or enum
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
};
