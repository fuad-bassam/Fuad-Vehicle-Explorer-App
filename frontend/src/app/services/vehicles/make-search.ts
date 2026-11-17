import type { IServiceOperationResult } from '../core/models/service-operation-result';
import type { IMake } from './models/make';

export async function searchMakesFromBrowser(keyword: string, signal: AbortSignal): Promise<IMake[]> {
  const response = await fetch(`/api/makes?keyword=${encodeURIComponent(keyword)}`, { signal });
  const body = (await response.json()) as IServiceOperationResult<IMake[]>;

  if (!body.isSuccessful) {
    throw new Error(body.errors.join(' '));
  }

  return body.result ?? [];
}
