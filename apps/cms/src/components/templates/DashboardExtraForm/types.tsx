import { FormEvent } from 'react'

import { CreateExtraDTO, Extra, UpdateExtraDTO } from '@/common/types/Extra'

export interface ExtraFormProps<T extends UpdateExtraDTO | CreateExtraDTO> {
    // eslint-disable-next-line no-unused-vars
    action?: (data: FormData) => Promise<void>
    data?: Extra
    isSaving?: boolean
    // eslint-disable-next-line no-unused-vars
    onSubmit?: (e: FormEvent<HTMLFormElement>, data: T) => void
}
