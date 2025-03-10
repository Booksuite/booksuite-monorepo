import { useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { useCompanyContext } from '@/app/providers/companyProvider'
import type { UpdateCompanyDTO } from '@/common/types/Company'
import { toastGenericPatchMessages } from '@/components/molecules/ToastMessages'
import { updateCompany } from '@/common/services/company/updateCompany'

export function useUpdateCompany(
    id?: number | string,
    formData?: UpdateCompanyDTO,
) {
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const { setCompany } = useCompanyContext()

    const toast = useToast()

    useEffect(() => {
        if (isSaving || !formData) {
            return
        }

        setIsSaving(true)

        const response = new Promise((resolve, reject) => {
            resolve(updateCompany(id, formData))
        })
            .then((resp: any) => {
                if (resp.success) {
                    if (resp.company) {
                        setCompany(resp.company)
                    }
                }
            })
            .finally(() => {
                setIsSaving(false)
            })

        toast.promise(response, toastGenericPatchMessages)
    }, [])

    return { isSaving }
}
