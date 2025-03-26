import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  UpsertCompanyCancellationPolicyMutationRequest,
  UpsertCompanyCancellationPolicyMutationResponse,
  UpsertCompanyCancellationPolicyPathParams,
} from '../../types/CancellationPolicyController/UpsertCompanyCancellationPolicy.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { upsertCompanyCancellationPolicy } from '../../client/CancellationPolicyService/upsertCompanyCancellationPolicy.ts'
import { useMutation } from '@tanstack/react-query'

export const upsertCompanyCancellationPolicyMutationKey = () => [{ url: '/company/{companyId}/cancellationPolicy' }] as const

export type UpsertCompanyCancellationPolicyMutationKey = ReturnType<typeof upsertCompanyCancellationPolicyMutationKey>

/**
 * {@link /company/:companyId/cancellationPolicy}
 */
export function useUpsertCompanyCancellationPolicy<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpsertCompanyCancellationPolicyMutationResponse,
      ResponseErrorConfig<Error>,
      { companyId: UpsertCompanyCancellationPolicyPathParams['companyId']; data: UpsertCompanyCancellationPolicyMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<UpsertCompanyCancellationPolicyMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? upsertCompanyCancellationPolicyMutationKey()

  return useMutation<
    UpsertCompanyCancellationPolicyMutationResponse,
    ResponseErrorConfig<Error>,
    { companyId: UpsertCompanyCancellationPolicyPathParams['companyId']; data: UpsertCompanyCancellationPolicyMutationRequest },
    TContext
  >({
    mutationFn: async ({ companyId, data }) => {
      return upsertCompanyCancellationPolicy({ companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}