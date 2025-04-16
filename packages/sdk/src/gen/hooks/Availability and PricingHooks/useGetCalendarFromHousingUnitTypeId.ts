import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  GetCalendarFromHousingUnitTypeIdMutationRequest,
  GetCalendarFromHousingUnitTypeIdMutationResponse,
  GetCalendarFromHousingUnitTypeIdPathParams,
} from '../../types/Availability and PricingController/GetCalendarFromHousingUnitTypeId.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { getCalendarFromHousingUnitTypeId } from '../../client/Availability and PricingService/getCalendarFromHousingUnitTypeId.ts'
import { useMutation } from '@tanstack/react-query'

export const getCalendarFromHousingUnitTypeIdMutationKey = () => [{ url: '/company/{companyId}/calendar/{housingUnitTypeId}' }] as const

export type GetCalendarFromHousingUnitTypeIdMutationKey = ReturnType<typeof getCalendarFromHousingUnitTypeIdMutationKey>

/**
 * @summary Get calendar for a specific housing unit type
 * {@link /company/:companyId/calendar/:housingUnitTypeId}
 */
export function useGetCalendarFromHousingUnitTypeId<TContext>(
  options: {
    mutation?: UseMutationOptions<
      GetCalendarFromHousingUnitTypeIdMutationResponse,
      ResponseErrorConfig<Error>,
      {
        housingUnitTypeId: GetCalendarFromHousingUnitTypeIdPathParams['housingUnitTypeId']
        companyId: GetCalendarFromHousingUnitTypeIdPathParams['companyId']
        data: GetCalendarFromHousingUnitTypeIdMutationRequest
      },
      TContext
    >
    client?: Partial<RequestConfig<GetCalendarFromHousingUnitTypeIdMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? getCalendarFromHousingUnitTypeIdMutationKey()

  return useMutation<
    GetCalendarFromHousingUnitTypeIdMutationResponse,
    ResponseErrorConfig<Error>,
    {
      housingUnitTypeId: GetCalendarFromHousingUnitTypeIdPathParams['housingUnitTypeId']
      companyId: GetCalendarFromHousingUnitTypeIdPathParams['companyId']
      data: GetCalendarFromHousingUnitTypeIdMutationRequest
    },
    TContext
  >({
    mutationFn: async ({ housingUnitTypeId, companyId, data }) => {
      return getCalendarFromHousingUnitTypeId({ housingUnitTypeId, companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}