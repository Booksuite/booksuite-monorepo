import client from '@kubb/plugin-client/clients/fetch'
import type {
  CreateReservationMutationRequest,
  CreateReservationMutationResponse,
  CreateReservationPathParams,
} from '../../types/ReservationController/CreateReservation.ts'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createReservation } from '../../client/ReservationService/createReservation.ts'
import { useMutation } from '@tanstack/react-query'

export const createReservationMutationKey = () => [{ url: '/company/{companyId}/reservation/create' }] as const

export type CreateReservationMutationKey = ReturnType<typeof createReservationMutationKey>

/**
 * {@link /company/:companyId/reservation/create}
 */
export function useCreateReservation(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<CreateReservationMutationResponse>,
      ResponseErrorConfig<Error>,
      { companyId: CreateReservationPathParams['companyId']; data: CreateReservationMutationRequest }
    >
    client?: Partial<RequestConfig<CreateReservationMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createReservationMutationKey()

  return useMutation<
    ResponseConfig<CreateReservationMutationResponse>,
    ResponseErrorConfig<Error>,
    { companyId: CreateReservationPathParams['companyId']; data: CreateReservationMutationRequest }
  >({
    mutationFn: async ({ companyId, data }) => {
      return createReservation({ companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}