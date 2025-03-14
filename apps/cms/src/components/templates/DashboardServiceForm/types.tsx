import { FormEvent } from 'react'

import {
    CreateServiceDTO,
    Service,
    UpdateServiceDTO,
} from '@/common/types/Service'

export interface ServiceFormProps<
    T extends UpdateServiceDTO | CreateServiceDTO,
> {
    action?: (data: FormData) => Promise<void>
    data?: Service
    isSaving?: boolean
    onSubmit?: (e: FormEvent<HTMLFormElement>, data: T) => void
}
