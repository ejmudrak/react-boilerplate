import axios from 'axios';
import qs from 'querystring';

export default function getClient() {
  const BASE_URL = process.env.REACT_APP_BASE_API_URL;

  const client = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    responseType: 'json',

    paramsSerializer: (params) => {
      let objParams = params;
      if (params instanceof URLSearchParams)
        objParams = qs.parse(params.toString());

      // Removes URL params without values
      for (const key in objParams) if (!objParams[key]) delete objParams[key];

      return qs.stringify(objParams);
    },
  });

  return client;
}
