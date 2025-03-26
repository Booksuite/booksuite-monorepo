import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  CreateReservationMutationRequest,
  CreateReservationMutationResponse,
  CreateReservationPathParams,
} from '../../types/ReservationController/CreateReservation.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createReservation } from '../../client/ReservationService/createReservation.ts'
import { useMutation } from '@tanstack/react-query'

export const createReservationMutationKey = () => [{ url: '/company/{companyId}/reservation/create' }] as const

export type CreateReservationMutationKey = ReturnType<typeof createReservationMutationKey>

/**
 * {@link /company/:companyId/reservation/create}
 */
export function useCreateReservation<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CreateReservationMutationResponse,
      ResponseErrorConfig<Error>,
      { companyId: CreateReservationPathParams['companyId']; data: CreateReservationMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<CreateReservationMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createReservationMutationKey()

  return useMutation<
    CreateReservationMutationResponse,
    ResponseErrorConfig<Error>,
    { companyId: CreateReservationPathParams['companyId']; data: CreateReservationMutationRequest },
    TContext
  >({
    mutationFn: async ({ companyId, data }) => {
      return createReservation({ companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}