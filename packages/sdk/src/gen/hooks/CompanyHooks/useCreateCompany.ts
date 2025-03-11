import client from '@kubb/plugin-client/clients/fetch'
import type { CreateCompanyMutationRequest, CreateCompanyMutationResponse } from '../../types/CompanyController/CreateCompany.ts'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createCompany } from '../../client/CompanyService/createCompany.ts'
import { useMutation } from '@tanstack/react-query'

export const createCompanyMutationKey = () => [{ url: '/company/create' }] as const

export type CreateCompanyMutationKey = ReturnType<typeof createCompanyMutationKey>

/**
 * {@link /company/create}
 */
export function useCreateCompany(
  options: {
    mutation?: UseMutationOptions<ResponseConfig<CreateCompanyMutationResponse>, ResponseErrorConfig<Error>, { data: CreateCompanyMutationRequest }>
    client?: Partial<RequestConfig<CreateCompanyMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createCompanyMutationKey()

  return useMutation<ResponseConfig<CreateCompanyMutationResponse>, ResponseErrorConfig<Error>, { data: CreateCompanyMutationRequest }>({
    mutationFn: async ({ data }) => {
      return createCompany(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}