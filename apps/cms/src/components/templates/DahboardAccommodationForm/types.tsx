import { FormEvent } from 'react'

import {
    Acomodacao,
    CreateAcomodacaoDTO,
    UpdateAcomodacaoDTO,
} from '@/common/types/Acomodacao'

export interface AccommodationFormProps<
    T extends UpdateAcomodacaoDTO | CreateAcomodacaoDTO,
> {
    // eslint-disable-next-line no-unused-vars
    action?: (data: FormData) => Promise<void>
    data?: Acomodacao
    isSaving?: boolean
    // eslint-disable-next-line no-unused-vars
    onSubmit?: (e: FormEvent<HTMLFormElement>, data: T) => void
}
