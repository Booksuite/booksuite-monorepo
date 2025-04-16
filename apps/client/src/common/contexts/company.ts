import { CompanyFull } from '@booksuite/sdk'
import { create } from 'zustand'

export const TEST_COMPANY = 'c1c3c5c7-c9cb-4cdd-8e15-c3c5c7c9cbcd'

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
