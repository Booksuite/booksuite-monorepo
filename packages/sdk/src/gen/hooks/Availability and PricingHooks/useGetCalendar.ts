import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  GetCalendarMutationRequest,
  GetCalendarMutationResponse,
  GetCalendarQueryParams,
} from '../../types/Availability and PricingController/GetCalendar.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { getCalendar } from '../../client/Availability and PricingService/getCalendar.ts'
import { useMutation } from '@tanstack/react-query'

export const getCalendarMutationKey = () => [{ url: '/company/{companyId}/calendar' }] as const

export type GetCalendarMutationKey = ReturnType<typeof getCalendarMutationKey>

/**
 * @summary Get calendar for all housing unit types in a company
 * {@link /company/:companyId/calendar}
 */
export function useGetCalendar<TContext>(
  options: {
    mutation?: UseMutationOptions<
      GetCalendarMutationResponse,
      ResponseErrorConfig<Error>,
      { data: GetCalendarMutationRequest; params: GetCalendarQueryParams },
      TContext
    >
    client?: Partial<RequestConfig<GetCalendarMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? getCalendarMutationKey()

  return useMutation<GetCalendarMutationResponse, ResponseErrorConfig<Error>, { data: GetCalendarMutationRequest; params: GetCalendarQueryParams }, TContext>({
    mutationFn: async ({ data, params }) => {
      return getCalendar(data, params, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}