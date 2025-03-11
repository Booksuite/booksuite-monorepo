import client from '@kubb/plugin-client/clients/fetch'
import type {
  UpsertCompanyCancellationPolicyMutationRequest,
  UpsertCompanyCancellationPolicyMutationResponse,
  UpsertCompanyCancellationPolicyPathParams,
} from '../../types/CancellationPolicyController/UpsertCompanyCancellationPolicy.ts'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'
import type { UseMutationOptions } from '@tanstack/react-query'
import { upsertCompanyCancellationPolicy } from '../../client/CancellationPolicyService/upsertCompanyCancellationPolicy.ts'
import { useMutation } from '@tanstack/react-query'

export const upsertCompanyCancellationPolicyMutationKey = () => [{ url: '/company/{companyId}/cancellationPolicy' }] as const

export type UpsertCompanyCancellationPolicyMutationKey = ReturnType<typeof upsertCompanyCancellationPolicyMutationKey>

/**
 * {@link /company/:companyId/cancellationPolicy}
 */
export function useUpsertCompanyCancellationPolicy(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<UpsertCompanyCancellationPolicyMutationResponse>,
      ResponseErrorConfig<Error>,
      { companyId: UpsertCompanyCancellationPolicyPathParams['companyId']; data: UpsertCompanyCancellationPolicyMutationRequest }
    >
    client?: Partial<RequestConfig<UpsertCompanyCancellationPolicyMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? upsertCompanyCancellationPolicyMutationKey()

  return useMutation<
    ResponseConfig<UpsertCompanyCancellationPolicyMutationResponse>,
    ResponseErrorConfig<Error>,
    { companyId: UpsertCompanyCancellationPolicyPathParams['companyId']; data: UpsertCompanyCancellationPolicyMutationRequest }
  >({
    mutationFn: async ({ companyId, data }) => {
      return upsertCompanyCancellationPolicy({ companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}