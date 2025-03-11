import client from '@kubb/plugin-client/clients/fetch'
import type { DeleteReservationMutationResponse, DeleteReservationPathParams } from '../../types/ReservationController/DeleteReservation.ts'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'
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
      ResponseConfig<DeleteReservationMutationResponse>,
      ResponseErrorConfig<Error>,
      { id: DeleteReservationPathParams['id']; companyId: DeleteReservationPathParams['companyId'] }
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteReservationMutationKey()

  return useMutation<
    ResponseConfig<DeleteReservationMutationResponse>,
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