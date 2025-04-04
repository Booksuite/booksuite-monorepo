import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  ReservationOptionsControllerUpdateMutationRequest,
  ReservationOptionsControllerUpdateMutationResponse,
  ReservationOptionsControllerUpdatePathParams,
} from '../../types/ReservationOptionsController/ReservationOptionsControllerUpdate.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { reservationOptionsControllerUpdate } from '../../client/ReservationOptionsService/reservationOptionsControllerUpdate.ts'
import { useMutation } from '@tanstack/react-query'

export const reservationOptionsControllerUpdateMutationKey = () => [{ url: '/company/{companyId}/reservationOptions/{id}' }] as const

export type ReservationOptionsControllerUpdateMutationKey = ReturnType<typeof reservationOptionsControllerUpdateMutationKey>

/**
 * {@link /company/:companyId/reservationOptions/:id}
 */
export function useReservationOptionsControllerUpdate<TContext>(
  options: {
    mutation?: UseMutationOptions<
      ReservationOptionsControllerUpdateMutationResponse,
      ResponseErrorConfig<Error>,
      {
        id: ReservationOptionsControllerUpdatePathParams['id']
        companyId: ReservationOptionsControllerUpdatePathParams['companyId']
        data?: ReservationOptionsControllerUpdateMutationRequest
      },
      TContext
    >
    client?: Partial<RequestConfig<ReservationOptionsControllerUpdateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? reservationOptionsControllerUpdateMutationKey()

  return useMutation<
    ReservationOptionsControllerUpdateMutationResponse,
    ResponseErrorConfig<Error>,
    {
      id: ReservationOptionsControllerUpdatePathParams['id']
      companyId: ReservationOptionsControllerUpdatePathParams['companyId']
      data?: ReservationOptionsControllerUpdateMutationRequest
    },
    TContext
  >({
    mutationFn: async ({ id, companyId, data }) => {
      return reservationOptionsControllerUpdate({ id, companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}