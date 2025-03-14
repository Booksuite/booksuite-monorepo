import { FormEvent } from 'react'

import {
    Acomodacao,
    CreateAcomodacaoDTO,
    UpdateAcomodacaoDTO,
} from '@/common/types/Acomodacao'

export interface AccommodationFormProps<
    T extends UpdateAcomodacaoDTO | CreateAcomodacaoDTO,
> {
    action?: (data: FormData) => Promise<void>
    data?: Acomodacao
    isSaving?: boolean
    onSubmit?: (e: FormEvent<HTMLFormElement>, data: T) => void
}
