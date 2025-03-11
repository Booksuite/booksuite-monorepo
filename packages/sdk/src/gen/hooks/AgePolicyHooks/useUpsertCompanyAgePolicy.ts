import client from '@kubb/plugin-client/clients/fetch'
import type {
  UpsertCompanyAgePolicyMutationRequest,
  UpsertCompanyAgePolicyMutationResponse,
  UpsertCompanyAgePolicyPathParams,
} from '../../types/AgePolicyController/UpsertCompanyAgePolicy.ts'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'
import type { UseMutationOptions } from '@tanstack/react-query'
import { upsertCompanyAgePolicy } from '../../client/AgePolicyService/upsertCompanyAgePolicy.ts'
import { useMutation } from '@tanstack/react-query'

export const upsertCompanyAgePolicyMutationKey = () => [{ url: '/company/{companyId}/agePolicy' }] as const

export type UpsertCompanyAgePolicyMutationKey = ReturnType<typeof upsertCompanyAgePolicyMutationKey>

/**
 * {@link /company/:companyId/agePolicy}
 */
export function useUpsertCompanyAgePolicy(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<UpsertCompanyAgePolicyMutationResponse>,
      ResponseErrorConfig<Error>,
      { companyId: UpsertCompanyAgePolicyPathParams['companyId']; data: UpsertCompanyAgePolicyMutationRequest }
    >
    client?: Partial<RequestConfig<UpsertCompanyAgePolicyMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? upsertCompanyAgePolicyMutationKey()

  return useMutation<
    ResponseConfig<UpsertCompanyAgePolicyMutationResponse>,
    ResponseErrorConfig<Error>,
    { companyId: UpsertCompanyAgePolicyPathParams['companyId']; data: UpsertCompanyAgePolicyMutationRequest }
  >({
    mutationFn: async ({ companyId, data }) => {
      return upsertCompanyAgePolicy({ companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}