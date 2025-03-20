import { CompanyFull } from '@booksuite/sdk'
import { create } from 'zustand'

export const TEST_COMPANY = 'fe6799d4-396f-48cf-bb73-cae5b82e85b2'

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
