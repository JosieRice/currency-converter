import { useQuery } from "@tanstack/react-query";
import { getExchangeRate } from "../client/getExchangeRate.ts";
import type { ExchangeRateParams } from "../types/getExchangeRate.ts";

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
