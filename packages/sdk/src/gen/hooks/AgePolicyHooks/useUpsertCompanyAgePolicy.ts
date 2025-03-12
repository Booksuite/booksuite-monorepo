import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  UpsertCompanyAgePolicyMutationRequest,
  UpsertCompanyAgePolicyMutationResponse,
  UpsertCompanyAgePolicyPathParams,
} from '../../types/AgePolicyController/UpsertCompanyAgePolicy.ts'
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
      UpsertCompanyAgePolicyMutationResponse,
      ResponseErrorConfig<Error>,
      { companyId: UpsertCompanyAgePolicyPathParams['companyId']; data: UpsertCompanyAgePolicyMutationRequest }
    >
    client?: Partial<RequestConfig<UpsertCompanyAgePolicyMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? upsertCompanyAgePolicyMutationKey()

  return useMutation<
    UpsertCompanyAgePolicyMutationResponse,
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