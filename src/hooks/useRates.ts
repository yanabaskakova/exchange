import { useCallback, useState } from 'react';
import { getRates } from 'services/rates';

import { CURRENCIES } from '../constants';
import { useInterval } from './useInterval';

const REFETCH_INTERVAL_VALUE = 10000;

let promise: null | Promise<{ data: { rates: Record<string, number> } }> = null;

export const useRates = () => {
  const [rates, setRates] = useState<Record<string, number> | null>(null);

  const updateRates = async (promise: Promise<{ data: { rates: Record<string, number> } }>) => {
    const { data } = await promise;

    for (let key in data.rates) {
      if (!CURRENCIES.includes(key)) {
        delete data.rates[key];
      }
    }

    setRates({ ...data.rates });
  };

  const fetchRates = useCallback(async () => {
    if (promise) return updateRates(promise);

    promise = getRates();

    await updateRates(promise);

    setTimeout(() => {
      promise = null;
    });
  }, []);

  useInterval(fetchRates, REFETCH_INTERVAL_VALUE);

  return rates;
};
