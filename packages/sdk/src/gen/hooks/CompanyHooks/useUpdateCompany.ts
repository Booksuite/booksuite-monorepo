import client from '@kubb/plugin-client/clients/fetch'
import type { UpdateCompanyMutationRequest, UpdateCompanyMutationResponse, UpdateCompanyPathParams } from '../../types/CompanyController/UpdateCompany.ts'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'
import type { UseMutationOptions } from '@tanstack/react-query'
import { updateCompany } from '../../client/CompanyService/updateCompany.ts'
import { useMutation } from '@tanstack/react-query'

export const updateCompanyMutationKey = () => [{ url: '/company/{id}' }] as const

export type UpdateCompanyMutationKey = ReturnType<typeof updateCompanyMutationKey>

/**
 * {@link /company/:id}
 */
export function useUpdateCompany(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<UpdateCompanyMutationResponse>,
      ResponseErrorConfig<Error>,
      { id: UpdateCompanyPathParams['id']; data: UpdateCompanyMutationRequest }
    >
    client?: Partial<RequestConfig<UpdateCompanyMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateCompanyMutationKey()

  return useMutation<
    ResponseConfig<UpdateCompanyMutationResponse>,
    ResponseErrorConfig<Error>,
    { id: UpdateCompanyPathParams['id']; data: UpdateCompanyMutationRequest }
  >({
    mutationFn: async ({ id, data }) => {
      return updateCompany({ id }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}