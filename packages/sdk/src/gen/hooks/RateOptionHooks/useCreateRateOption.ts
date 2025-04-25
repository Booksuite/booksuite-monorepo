import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  CreateRateOptionMutationRequest,
  CreateRateOptionMutationResponse,
  CreateRateOptionPathParams,
} from '../../types/RateOptionController/CreateRateOption.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createRateOption } from '../../client/RateOptionService/createRateOption.ts'
import { useMutation } from '@tanstack/react-query'

export const createRateOptionMutationKey = () => [{ url: '/company/{companyId}/rateOption' }] as const

export type CreateRateOptionMutationKey = ReturnType<typeof createRateOptionMutationKey>

/**
 * {@link /company/:companyId/rateOption}
 */
export function useCreateRateOption<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CreateRateOptionMutationResponse,
      ResponseErrorConfig<Error>,
      { companyId: CreateRateOptionPathParams['companyId']; data: CreateRateOptionMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<CreateRateOptionMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createRateOptionMutationKey()

  return useMutation<
    CreateRateOptionMutationResponse,
    ResponseErrorConfig<Error>,
    { companyId: CreateRateOptionPathParams['companyId']; data: CreateRateOptionMutationRequest },
    TContext
  >({
    mutationFn: async ({ companyId, data }) => {
      return createRateOption({ companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}