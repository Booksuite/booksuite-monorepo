import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  ReservationControllerUpdateMutationRequest,
  ReservationControllerUpdateMutationResponse,
  ReservationControllerUpdatePathParams,
} from '../../types/ReservationController/ReservationControllerUpdate.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { reservationControllerUpdate } from '../../client/ReservationService/reservationControllerUpdate.ts'
import { useMutation } from '@tanstack/react-query'

export const reservationControllerUpdateMutationKey = () => [{ url: '/company/{companyId}/reservation/{id}' }] as const

export type ReservationControllerUpdateMutationKey = ReturnType<typeof reservationControllerUpdateMutationKey>

/**
 * {@link /company/:companyId/reservation/:id}
 */
export function useReservationControllerUpdate(
  options: {
    mutation?: UseMutationOptions<
      ReservationControllerUpdateMutationResponse,
      ResponseErrorConfig<Error>,
      {
        companyId: ReservationControllerUpdatePathParams['companyId']
        id: ReservationControllerUpdatePathParams['id']
        data?: ReservationControllerUpdateMutationRequest
      }
    >
    client?: Partial<RequestConfig<ReservationControllerUpdateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? reservationControllerUpdateMutationKey()

  return useMutation<
    ReservationControllerUpdateMutationResponse,
    ResponseErrorConfig<Error>,
    {
      companyId: ReservationControllerUpdatePathParams['companyId']
      id: ReservationControllerUpdatePathParams['id']
      data?: ReservationControllerUpdateMutationRequest
    }
  >({
    mutationFn: async ({ companyId, id, data }) => {
      return reservationControllerUpdate({ companyId, id }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}