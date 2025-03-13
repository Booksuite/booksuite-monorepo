import { useUploadMedia } from '@booksuite/sdk'

export function UploadMedia(companyId: string, file: Blob) {
    return useUploadMedia().mutate({
        companyId: companyId,
        data: { file: file },
    })
}
