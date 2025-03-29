import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type {
  UpsertCompanyHostingRulesMutationRequest,
  UpsertCompanyHostingRulesMutationResponse,
  UpsertCompanyHostingRulesPathParams,
} from '../../types/HostingRulesController/UpsertCompanyHostingRules.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { upsertCompanyHostingRules } from '../../client/HostingRulesService/upsertCompanyHostingRules.ts'
import { useMutation } from '@tanstack/react-query'

export const upsertCompanyHostingRulesMutationKey = () => [{ url: '/company/{companyId}/hostingRules' }] as const

export type UpsertCompanyHostingRulesMutationKey = ReturnType<typeof upsertCompanyHostingRulesMutationKey>

/**
 * {@link /company/:companyId/hostingRules}
 */
export function useUpsertCompanyHostingRules<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpsertCompanyHostingRulesMutationResponse,
      ResponseErrorConfig<Error>,
      { companyId: UpsertCompanyHostingRulesPathParams['companyId']; data: UpsertCompanyHostingRulesMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<UpsertCompanyHostingRulesMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? upsertCompanyHostingRulesMutationKey()

  return useMutation<
    UpsertCompanyHostingRulesMutationResponse,
    ResponseErrorConfig<Error>,
    { companyId: UpsertCompanyHostingRulesPathParams['companyId']; data: UpsertCompanyHostingRulesMutationRequest },
    TContext
  >({
    mutationFn: async ({ companyId, data }) => {
      return upsertCompanyHostingRules({ companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}