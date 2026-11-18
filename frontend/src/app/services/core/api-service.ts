import { headers } from 'next/headers';
import type { ApiQuery } from './models/api-query';
import type { IApiResponse, IServiceOperationResult } from './models/service-operation-result';

const unreachableResponse: IApiResponse<never> = {
  result: null,
  isSuccessful: false,
  errorCodes: ['UpstreamUnavailable'],
  errors: ['The vehicle service could not be reached. Please try again shortly.'],
  status: 503
};

export async function apiGet<T>(path: string, query: ApiQuery = {}): Promise<IApiResponse<T>> {
  try {
    const url = new URL(path, process.env.API_BASE_URL);

    Object.entries(query).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });

    const clientIp = (await headers()).get('x-forwarded-for');
    const response = await fetch(url, { cache: 'no-store', headers: clientIp ? { 'X-Forwarded-For': clientIp } : {} });
    const body = (await response.json()) as IServiceOperationResult<T>;

    return { ...body, status: response.status };
  } catch {
    return unreachableResponse;
  }
}
