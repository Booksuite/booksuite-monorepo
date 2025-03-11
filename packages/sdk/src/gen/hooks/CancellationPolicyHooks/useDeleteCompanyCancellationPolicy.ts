import client from '@kubb/plugin-client/clients/fetch'
import type {
  DeleteCompanyCancellationPolicyMutationResponse,
  DeleteCompanyCancellationPolicyPathParams,
} from '../../types/CancellationPolicyController/DeleteCompanyCancellationPolicy.ts'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteCompanyCancellationPolicy } from '../../client/CancellationPolicyService/deleteCompanyCancellationPolicy.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteCompanyCancellationPolicyMutationKey = () => [{ url: '/company/{companyId}/cancellationPolicy' }] as const

export type DeleteCompanyCancellationPolicyMutationKey = ReturnType<typeof deleteCompanyCancellationPolicyMutationKey>

/**
 * {@link /company/:companyId/cancellationPolicy}
 */
export function useDeleteCompanyCancellationPolicy(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<DeleteCompanyCancellationPolicyMutationResponse>,
      ResponseErrorConfig<Error>,
      { companyId: DeleteCompanyCancellationPolicyPathParams['companyId'] }
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteCompanyCancellationPolicyMutationKey()

  return useMutation<
    ResponseConfig<DeleteCompanyCancellationPolicyMutationResponse>,
    ResponseErrorConfig<Error>,
    { companyId: DeleteCompanyCancellationPolicyPathParams['companyId'] }
  >({
    mutationFn: async ({ companyId }) => {
      return deleteCompanyCancellationPolicy({ companyId }, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}