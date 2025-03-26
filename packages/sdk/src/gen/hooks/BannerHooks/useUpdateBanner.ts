import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { UpdateBannerMutationRequest, UpdateBannerMutationResponse, UpdateBannerPathParams } from '../../types/BannerController/UpdateBanner.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { updateBanner } from '../../client/BannerService/updateBanner.ts'
import { useMutation } from '@tanstack/react-query'

export const updateBannerMutationKey = () => [{ url: '/company/{companyId}/banner/{id}' }] as const

export type UpdateBannerMutationKey = ReturnType<typeof updateBannerMutationKey>

/**
 * {@link /company/:companyId/banner/:id}
 */
export function useUpdateBanner<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpdateBannerMutationResponse,
      ResponseErrorConfig<Error>,
      { id: UpdateBannerPathParams['id']; companyId: UpdateBannerPathParams['companyId']; data?: UpdateBannerMutationRequest },
      TContext
    >
    client?: Partial<RequestConfig<UpdateBannerMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateBannerMutationKey()

  return useMutation<
    UpdateBannerMutationResponse,
    ResponseErrorConfig<Error>,
    { id: UpdateBannerPathParams['id']; companyId: UpdateBannerPathParams['companyId']; data?: UpdateBannerMutationRequest },
    TContext
  >({
    mutationFn: async ({ id, companyId, data }) => {
      return updateBanner({ id, companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}