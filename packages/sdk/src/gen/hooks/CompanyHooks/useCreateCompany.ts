import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { CreateCompanyMutationRequest, CreateCompanyMutationResponse } from '../../types/CompanyController/CreateCompany.ts'
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
    mutation?: UseMutationOptions<CreateCompanyMutationResponse, ResponseErrorConfig<Error>, { data: CreateCompanyMutationRequest }>
    client?: Partial<RequestConfig<CreateCompanyMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createCompanyMutationKey()

  return useMutation<CreateCompanyMutationResponse, ResponseErrorConfig<Error>, { data: CreateCompanyMutationRequest }>({
    mutationFn: async ({ data }) => {
      return createCompany(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}