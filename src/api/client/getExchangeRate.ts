import type {
  ExchangeRateParams,
  ExchangeRateResponse,
} from "../types/getExchangeRate.ts";

type Args = {
  params: ExchangeRateParams;
};

export const getExchangeRate = async ({
  params,
}: Args): Promise<ExchangeRateResponse> => {
  const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY as
    | string
    | undefined;

  if (!apiKey || !params.currencyCode) {
    throw new Error("Exchange rate API key not found");
  }

  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${params.currencyCode}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status.toString()}`);
  }
  return (await response.json()) as ExchangeRateResponse;
};
