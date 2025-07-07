import { useQuery } from "@tanstack/react-query";

import type { ExchangeRateParams } from "../types/getExchangeRate.ts";

import { getExchangeRate } from "../client/getExchangeRate.ts";

type Args = {
  params: ExchangeRateParams;
};

export const useGetExchangeRate = ({ params }: Args) => {
  return useQuery({
    enabled: Boolean(params.currencyCode),
    queryFn: () => getExchangeRate({ params }),
    queryKey: ["exchangeRates", params],
  });
};
