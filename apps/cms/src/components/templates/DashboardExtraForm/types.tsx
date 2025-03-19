import { FormEvent } from 'react'

import { CreateExtraDTO, Extra, UpdateExtraDTO } from '@/common/types/Extra'

export interface ExtraFormProps<T extends UpdateExtraDTO | CreateExtraDTO> {
    action?: (data: FormData) => Promise<void>
    data?: Extra
    isSaving?: boolean
    onSubmit?: (e: FormEvent<HTMLFormElement>, data: T) => void
}
