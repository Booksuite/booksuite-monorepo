import { FormEvent } from 'react'

import {
    CreateExperienceDTO,
    Experience,
    UpdateExperienceDTO,
} from '@/common/types/Experience'

export interface ExperienceFormProps<
    T extends UpdateExperienceDTO | CreateExperienceDTO,
> {
    // eslint-disable-next-line no-unused-vars
    action?: (data: FormData) => Promise<void>
    data?: Experience
    isSaving?: boolean
    // eslint-disable-next-line no-unused-vars
    onSubmit?: (e: FormEvent<HTMLFormElement>, data: T) => void
}
