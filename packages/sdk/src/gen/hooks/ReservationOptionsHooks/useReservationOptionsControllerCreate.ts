import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  ReservationOptionsControllerCreateMutationRequest,
  ReservationOptionsControllerCreateMutationResponse,
  ReservationOptionsControllerCreatePathParams,
} from '../../types/ReservationOptionsController/ReservationOptionsControllerCreate.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { reservationOptionsControllerCreate } from '../../client/ReservationOptionsService/reservationOptionsControllerCreate.ts'
import { useMutation } from '@tanstack/react-query'

export const reservationOptionsControllerCreateMutationKey = () => [{ url: '/company/{companyId}/reservationOptions' }] as const

export type ReservationOptionsControllerCreateMutationKey = ReturnType<typeof reservationOptionsControllerCreateMutationKey>

/**
 * {@link /company/:companyId/reservationOptions}
 */
export function useReservationOptionsControllerCreate<TContext>(
  options: {
    mutation?: UseMutationOptions<
      ReservationOptionsControllerCreateMutationResponse,
      ResponseErrorConfig<Error>,
      { companyId: ReservationOptionsControllerCreatePathParams['companyId']; data: ReservationOptionsControllerCreateMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<ReservationOptionsControllerCreateMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? reservationOptionsControllerCreateMutationKey()

  return useMutation<
    ReservationOptionsControllerCreateMutationResponse,
    ResponseErrorConfig<Error>,
    { companyId: ReservationOptionsControllerCreatePathParams['companyId']; data: ReservationOptionsControllerCreateMutationRequest },
    TContext
  >({
    mutationFn: async ({ companyId, data }) => {
      return reservationOptionsControllerCreate({ companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}