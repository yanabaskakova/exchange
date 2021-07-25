import axios from 'axios';

interface IRates {
  base?: string;
  symbols?: string;
}

export const getRates = (params: IRates = {}) => {
  return axios.get('https://openexchangerates.org/api/latest.json', {
    params: { app_id: process.env.REACT_APP_RATES_APP_ID, ...params },
  });
};
