
import axios, { AxiosRequestConfig } from 'axios';

const service = axios.create({
    withCredentials: true,
    timeout: 10000,
  });
export const performRequest = async ({
    url,
    data,
    method = 'POST',
    ...props
  }: AxiosRequestConfig) => {
    try {
      const response: any = await service({
        url,
        withCredentials: true,
        method,
        ...(method !== 'GET' && {data}),
        ...props,
      });
      return response;
    } catch (err: any) {
      throw err;
    }
  };
  