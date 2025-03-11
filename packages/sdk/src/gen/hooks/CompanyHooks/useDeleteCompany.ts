import client from '@kubb/plugin-client/clients/fetch'
import type { DeleteCompanyMutationResponse, DeleteCompanyPathParams } from '../../types/CompanyController/DeleteCompany.ts'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteCompany } from '../../client/CompanyService/deleteCompany.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteCompanyMutationKey = () => [{ url: '/company/{id}' }] as const

export type DeleteCompanyMutationKey = ReturnType<typeof deleteCompanyMutationKey>

/**
 * {@link /company/:id}
 */
export function useDeleteCompany(
  options: {
    mutation?: UseMutationOptions<ResponseConfig<DeleteCompanyMutationResponse>, ResponseErrorConfig<Error>, { id: DeleteCompanyPathParams['id'] }>
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteCompanyMutationKey()

  return useMutation<ResponseConfig<DeleteCompanyMutationResponse>, ResponseErrorConfig<Error>, { id: DeleteCompanyPathParams['id'] }>({
    mutationFn: async ({ id }) => {
      return deleteCompany({ id }, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}