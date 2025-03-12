import { FormEvent } from 'react'

import {
    CreateExperienceDTO,
    Experience,
    UpdateExperienceDTO,
} from '@/common/types/Experience'

export interface ExperienceFormProps<
    T extends UpdateExperienceDTO | CreateExperienceDTO,
> {
    action?: (data: FormData) => Promise<void>
    data?: Experience
    isSaving?: boolean
    onSubmit?: (e: FormEvent<HTMLFormElement>, data: T) => void
}
