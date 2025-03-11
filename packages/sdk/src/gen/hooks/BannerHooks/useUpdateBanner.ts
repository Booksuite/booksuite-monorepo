import client from '@kubb/plugin-client/clients/fetch'
import type { UpdateBannerMutationRequest, UpdateBannerMutationResponse, UpdateBannerPathParams } from '../../types/BannerController/UpdateBanner.ts'
import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'
import type { UseMutationOptions } from '@tanstack/react-query'
import { updateBanner } from '../../client/BannerService/updateBanner.ts'
import { useMutation } from '@tanstack/react-query'

export const updateBannerMutationKey = () => [{ url: '/company/{companyId}/banner/{id}' }] as const

export type UpdateBannerMutationKey = ReturnType<typeof updateBannerMutationKey>

/**
 * {@link /company/:companyId/banner/:id}
 */
export function useUpdateBanner(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<UpdateBannerMutationResponse>,
      ResponseErrorConfig<Error>,
      { id: UpdateBannerPathParams['id']; companyId: UpdateBannerPathParams['companyId']; data: UpdateBannerMutationRequest }
    >
    client?: Partial<RequestConfig<UpdateBannerMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateBannerMutationKey()

  return useMutation<
    ResponseConfig<UpdateBannerMutationResponse>,
    ResponseErrorConfig<Error>,
    { id: UpdateBannerPathParams['id']; companyId: UpdateBannerPathParams['companyId']; data: UpdateBannerMutationRequest }
  >({
    mutationFn: async ({ id, companyId, data }) => {
      return updateBanner({ id, companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}