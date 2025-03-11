import { create } from 'zustand'

import { CompanyFull } from '../models'

export const TEST_COMPANY = '4107d1d7-49b9-41dd-86a6-2eb425dc4aef'

type CurrentCompanyStore = {
    company: CompanyFull | null
    setCompany: (company: CompanyFull | null) => void
}

export const useCurrentCompanyStore = create<CurrentCompanyStore>((set) => ({
    company: null,
    setCompany: (company: CompanyFull | null) => set({ company }),
}))

export const useCurrentCompanyId = () =>
    useCurrentCompanyStore((state) => {
        if (!state.company) throw new Error('Nenhuma empresa selecionada')

        return state.company.id as string
    })
