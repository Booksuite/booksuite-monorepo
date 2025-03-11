import client from '@kubb/plugin-client/clients/fetch'
import type {
  UpsertCompanyReservationConfigMutationRequest,
  UpsertCompanyReservationConfigMutationResponse,
  UpsertCompanyReservationConfigPathParams,
} from '../../types/ReservationConfigController/UpsertCompanyReservationConfig.ts'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'
import type { UseMutationOptions } from '@tanstack/react-query'
import { upsertCompanyReservationConfig } from '../../client/ReservationConfigService/upsertCompanyReservationConfig.ts'
import { useMutation } from '@tanstack/react-query'

export const upsertCompanyReservationConfigMutationKey = () => [{ url: '/company/{companyId}/reservationConfig' }] as const

export type UpsertCompanyReservationConfigMutationKey = ReturnType<typeof upsertCompanyReservationConfigMutationKey>

/**
 * {@link /company/:companyId/reservationConfig}
 */
export function useUpsertCompanyReservationConfig(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<UpsertCompanyReservationConfigMutationResponse>,
      ResponseErrorConfig<Error>,
      { companyId: UpsertCompanyReservationConfigPathParams['companyId']; data: UpsertCompanyReservationConfigMutationRequest }
    >
    client?: Partial<RequestConfig<UpsertCompanyReservationConfigMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? upsertCompanyReservationConfigMutationKey()

  return useMutation<
    ResponseConfig<UpsertCompanyReservationConfigMutationResponse>,
    ResponseErrorConfig<Error>,
    { companyId: UpsertCompanyReservationConfigPathParams['companyId']; data: UpsertCompanyReservationConfigMutationRequest }
  >({
    mutationFn: async ({ companyId, data }) => {
      return upsertCompanyReservationConfig({ companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}