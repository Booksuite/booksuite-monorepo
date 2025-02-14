import { useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { useCompanyContext } from '@/app/providers/companyProvider'
import { toastGenericPatchMessages } from '@/contexts/constants/toastMessages'
import { updateCompany } from '@/services/company/updateCompany'
import type { UpdateCompanyDTO } from '@/types/Company'

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
