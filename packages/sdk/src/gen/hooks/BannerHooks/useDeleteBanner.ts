import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { DeleteBannerMutationResponse, DeleteBannerPathParams } from '../../types/BannerController/DeleteBanner.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { deleteBanner } from '../../client/BannerService/deleteBanner.ts'
import { useMutation } from '@tanstack/react-query'

export const deleteBannerMutationKey = () => [{ url: '/company/{companyId}/banner/{id}' }] as const

export type DeleteBannerMutationKey = ReturnType<typeof deleteBannerMutationKey>

/**
 * {@link /company/:companyId/banner/:id}
 */
export function useDeleteBanner(
  options: {
    mutation?: UseMutationOptions<
      DeleteBannerMutationResponse,
      ResponseErrorConfig<Error>,
      { id: DeleteBannerPathParams['id']; companyId: DeleteBannerPathParams['companyId'] }
    >
    client?: Partial<RequestConfig> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteBannerMutationKey()

  return useMutation<
    DeleteBannerMutationResponse,
    ResponseErrorConfig<Error>,
    { id: DeleteBannerPathParams['id']; companyId: DeleteBannerPathParams['companyId'] }
  >({
    mutationFn: async ({ id, companyId }) => {
      return deleteBanner({ id, companyId }, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}