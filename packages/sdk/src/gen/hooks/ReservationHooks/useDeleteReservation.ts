import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { DeleteReservationMutationResponse, DeleteReservationPathParams } from '../../types/ReservationController/DeleteReservation.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteReservation } from '../../client/ReservationService/deleteReservation.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteReservationMutationKey = () => [{ url: '/company/{companyId}/reservation/{id}' }] as const

export type DeleteReservationMutationKey = ReturnType<typeof deleteReservationMutationKey>

/**
 * {@link /company/:companyId/reservation/:id}
 */
export function useDeleteReservation(
  options: {
    mutation?: UseMutationOptions<
      DeleteReservationMutationResponse,
      ResponseErrorConfig<Error>,
      { id: DeleteReservationPathParams['id']; companyId: DeleteReservationPathParams['companyId'] }
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteReservationMutationKey()

  return useMutation<
    DeleteReservationMutationResponse,
    ResponseErrorConfig<Error>,
    { id: DeleteReservationPathParams['id']; companyId: DeleteReservationPathParams['companyId'] }
  >({
    mutationFn: async ({ id, companyId }) => {
      return deleteReservation({ id, companyId }, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}