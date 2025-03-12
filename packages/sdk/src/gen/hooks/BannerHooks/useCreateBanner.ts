import client from '../../../axios-client'
import type { RequestConfig, ResponseErrorConfig } from '../../../axios-client'
import type { CreateBannerMutationRequest, CreateBannerMutationResponse, CreateBannerPathParams } from '../../types/BannerController/CreateBanner.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { createBanner } from '../../client/BannerService/createBanner.ts'
import { useMutation } from '@tanstack/react-query'

export const createBannerMutationKey = () => [{ url: '/company/{companyId}/banner/create' }] as const

export type CreateBannerMutationKey = ReturnType<typeof createBannerMutationKey>

/**
 * {@link /company/:companyId/banner/create}
 */
export function useCreateBanner(
  options: {
    mutation?: UseMutationOptions<
      CreateBannerMutationResponse,
      ResponseErrorConfig<Error>,
      { companyId: CreateBannerPathParams['companyId']; data: CreateBannerMutationRequest }
    >
    client?: Partial<RequestConfig<CreateBannerMutationRequest>> & { client?: typeof client }
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createBannerMutationKey()

  return useMutation<
    CreateBannerMutationResponse,
    ResponseErrorConfig<Error>,
    { companyId: CreateBannerPathParams['companyId']; data: CreateBannerMutationRequest }
  >({
    mutationFn: async ({ companyId, data }) => {
      return createBanner({ companyId }, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}