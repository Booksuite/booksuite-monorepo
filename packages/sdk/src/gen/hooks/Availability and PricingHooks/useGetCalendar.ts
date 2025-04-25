import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  GetCalendarMutationRequest,
  GetCalendarMutationResponse,
  GetCalendarPathParams,
} from '../../types/Availability and PricingController/GetCalendar.ts'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getCalendar } from '../../client/Availability and PricingService/getCalendar.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getCalendarQueryKey = ({ companyId }: { companyId: GetCalendarPathParams['companyId'] }, data: GetCalendarMutationRequest) =>
  ['getCalendar', { companyId: companyId }, ...(data ? [data] : [])] as const

export type GetCalendarQueryKey = ReturnType<typeof getCalendarQueryKey>

export function getCalendarQueryOptions(
  { companyId }: { companyId: GetCalendarPathParams['companyId'] },
  data: GetCalendarMutationRequest,
  config: Partial<RequestConfig<GetCalendarMutationRequest>> & { client?: typeof client } = {},
) {
  const queryKey = getCalendarQueryKey({ companyId }, data)
  return queryOptions<GetCalendarMutationResponse, ResponseErrorConfig<Error>, GetCalendarMutationResponse, typeof queryKey>({
    enabled: !!(companyId && data),
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getCalendar({ companyId }, data, config)
    },
  })
}

/**
 * @summary Get calendar for all housing unit types in a company
 * {@link /company/:companyId/calendar}
 */
export function useGetCalendar<TData = GetCalendarMutationResponse, TQueryData = GetCalendarMutationResponse, TQueryKey extends QueryKey = GetCalendarQueryKey>(
  { companyId }: { companyId: GetCalendarPathParams['companyId'] },
  data: GetCalendarMutationRequest,
  options: {
    query?: Partial<QueryObserverOptions<GetCalendarMutationResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig<GetCalendarMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getCalendarQueryKey({ companyId }, data)

  const query = useQuery({
    ...(getCalendarQueryOptions({ companyId }, data, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}