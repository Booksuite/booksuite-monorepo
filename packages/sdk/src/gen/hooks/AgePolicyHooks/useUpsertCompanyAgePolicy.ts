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

export const upsertCompanyAgePolicyMutationKey = () => [{ url: '/company/{companyId}/agePolicy/{id}' }] as const

export type UpsertCompanyAgePolicyMutationKey = ReturnType<typeof upsertCompanyAgePolicyMutationKey>

/**
 * {@link /company/:companyId/agePolicy/:id}
 */
export function useUpsertCompanyAgePolicy<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpsertCompanyAgePolicyMutationResponse,
      ResponseErrorConfig<Error>,
      { companyId: UpsertCompanyAgePolicyPathParams['companyId']; id: UpsertCompanyAgePolicyPathParams['id']; data: UpsertCompanyAgePolicyMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<UpsertCompanyAgePolicyMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? upsertCompanyAgePolicyMutationKey()

  return useMutation<
    UpsertCompanyAgePolicyMutationResponse,
    ResponseErrorConfig<Error>,
    { companyId: UpsertCompanyAgePolicyPathParams['companyId']; id: UpsertCompanyAgePolicyPathParams['id']; data: UpsertCompanyAgePolicyMutationRequest },
    TContext
  >({
    mutationFn: async ({ companyId, id, data }) => {
      return upsertCompanyAgePolicy({ companyId, id }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}