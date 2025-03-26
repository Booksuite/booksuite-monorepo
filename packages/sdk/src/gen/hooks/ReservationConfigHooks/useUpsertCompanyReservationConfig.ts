import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  UpsertCompanyReservationConfigMutationRequest,
  UpsertCompanyReservationConfigMutationResponse,
  UpsertCompanyReservationConfigPathParams,
} from '../../types/ReservationConfigController/UpsertCompanyReservationConfig.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { upsertCompanyReservationConfig } from '../../client/ReservationConfigService/upsertCompanyReservationConfig.ts'
import { useMutation } from '@tanstack/react-query'

export const upsertCompanyReservationConfigMutationKey = () => [{ url: '/company/{companyId}/reservationConfig' }] as const

export type UpsertCompanyReservationConfigMutationKey = ReturnType<typeof upsertCompanyReservationConfigMutationKey>

/**
 * {@link /company/:companyId/reservationConfig}
 */
export function useUpsertCompanyReservationConfig<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpsertCompanyReservationConfigMutationResponse,
      ResponseErrorConfig<Error>,
      { companyId: UpsertCompanyReservationConfigPathParams['companyId']; data: UpsertCompanyReservationConfigMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<UpsertCompanyReservationConfigMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? upsertCompanyReservationConfigMutationKey()

  return useMutation<
    UpsertCompanyReservationConfigMutationResponse,
    ResponseErrorConfig<Error>,
    { companyId: UpsertCompanyReservationConfigPathParams['companyId']; data: UpsertCompanyReservationConfigMutationRequest },
    TContext
  >({
    mutationFn: async ({ companyId, data }) => {
      return upsertCompanyReservationConfig({ companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}