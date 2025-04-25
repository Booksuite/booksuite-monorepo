import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  UpdateRateOptionMutationRequest,
  UpdateRateOptionMutationResponse,
  UpdateRateOptionPathParams,
} from '../../types/RateOptionController/UpdateRateOption.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { updateRateOption } from '../../client/RateOptionService/updateRateOption.ts'
import { useMutation } from '@tanstack/react-query'

export const updateRateOptionMutationKey = () => [{ url: '/company/{companyId}/rateOption/{id}' }] as const

export type UpdateRateOptionMutationKey = ReturnType<typeof updateRateOptionMutationKey>

/**
 * {@link /company/:companyId/rateOption/:id}
 */
export function useUpdateRateOption<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpdateRateOptionMutationResponse,
      ResponseErrorConfig<Error>,
      { id: UpdateRateOptionPathParams['id']; companyId: UpdateRateOptionPathParams['companyId']; data?: UpdateRateOptionMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<UpdateRateOptionMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateRateOptionMutationKey()

  return useMutation<
    UpdateRateOptionMutationResponse,
    ResponseErrorConfig<Error>,
    { id: UpdateRateOptionPathParams['id']; companyId: UpdateRateOptionPathParams['companyId']; data?: UpdateRateOptionMutationRequest },
    TContext
  >({
    mutationFn: async ({ id, companyId, data }) => {
      return updateRateOption({ id, companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}