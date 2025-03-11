import client from '@kubb/plugin-client/clients/fetch'
import type {
  GetCompanyReservationConfigQueryResponse,
  GetCompanyReservationConfigPathParams,
} from '../../types/ReservationConfigController/GetCompanyReservationConfig.ts'
import type { RequestConfig, ResponseErrorConfig, ResponseConfig } from '@kubb/plugin-client/clients/fetch'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { getCompanyReservationConfig } from '../../client/ReservationConfigService/getCompanyReservationConfig.ts'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getCompanyReservationConfigQueryKey = ({ companyId }: { companyId: GetCompanyReservationConfigPathParams['companyId'] }) =>
  [{ url: '/company/:companyId/reservationConfig', params: { companyId: companyId } }] as const

export type GetCompanyReservationConfigQueryKey = ReturnType<typeof getCompanyReservationConfigQueryKey>

export function getCompanyReservationConfigQueryOptions(
  { companyId }: { companyId: GetCompanyReservationConfigPathParams['companyId'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {},
) {
  const queryKey = getCompanyReservationConfigQueryKey({ companyId })
  return queryOptions<
    ResponseConfig<GetCompanyReservationConfigQueryResponse>,
    ResponseErrorConfig<Error>,
    ResponseConfig<GetCompanyReservationConfigQueryResponse>,
    typeof queryKey
  >({
    enabled: !!companyId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getCompanyReservationConfig({ companyId }, config)
    },
  })
}

/**
 * {@link /company/:companyId/reservationConfig}
 */
export function useGetCompanyReservationConfig<
  TData = ResponseConfig<GetCompanyReservationConfigQueryResponse>,
  TQueryData = ResponseConfig<GetCompanyReservationConfigQueryResponse>,
  TQueryKey extends QueryKey = GetCompanyReservationConfigQueryKey,
>(
  { companyId }: { companyId: GetCompanyReservationConfigPathParams['companyId'] },
  options: {
    query?: Partial<QueryObserverOptions<ResponseConfig<GetCompanyReservationConfigQueryResponse>, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getCompanyReservationConfigQueryKey({ companyId })

  const query = useQuery({
    ...(getCompanyReservationConfigQueryOptions({ companyId }, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}