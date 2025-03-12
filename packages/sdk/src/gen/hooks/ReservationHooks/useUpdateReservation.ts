import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  UpdateReservationMutationRequest,
  UpdateReservationMutationResponse,
  UpdateReservationPathParams,
} from '../../types/ReservationController/UpdateReservation.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { updateReservation } from '../../client/ReservationService/updateReservation.ts'
import { useMutation } from '@tanstack/react-query'

export const updateReservationMutationKey = () => [{ url: '/company/{companyId}/reservation/{id}' }] as const

export type UpdateReservationMutationKey = ReturnType<typeof updateReservationMutationKey>

/**
 * {@link /company/:companyId/reservation/:id}
 */
export function useUpdateReservation(
  options: {
    mutation?: UseMutationOptions<
      UpdateReservationMutationResponse,
      ResponseErrorConfig<Error>,
      { id: UpdateReservationPathParams['id']; companyId: UpdateReservationPathParams['companyId']; data: UpdateReservationMutationRequest }
    >
    client?: Partial<RequestConfig<UpdateReservationMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateReservationMutationKey()

  return useMutation<
    UpdateReservationMutationResponse,
    ResponseErrorConfig<Error>,
    { id: UpdateReservationPathParams['id']; companyId: UpdateReservationPathParams['companyId']; data: UpdateReservationMutationRequest }
  >({
    mutationFn: async ({ id, companyId, data }) => {
      return updateReservation({ id, companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}