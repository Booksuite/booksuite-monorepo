import client from '@kubb/plugin-client/clients/fetch'
import type {
  UpdateReservationMutationRequest,
  UpdateReservationMutationResponse,
  UpdateReservationPathParams,
} from '../../types/ReservationController/UpdateReservation.ts'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'
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
      ResponseConfig<UpdateReservationMutationResponse>,
      ResponseErrorConfig<Error>,
      { id: UpdateReservationPathParams['id']; companyId: UpdateReservationPathParams['companyId']; data: UpdateReservationMutationRequest }
    >
    client?: Partial<RequestConfig<UpdateReservationMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateReservationMutationKey()

  return useMutation<
    ResponseConfig<UpdateReservationMutationResponse>,
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