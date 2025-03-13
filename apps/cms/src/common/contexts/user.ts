import { CompanyFull } from '@booksuite/sdk'
import { create } from 'zustand'

export const TEST_COMPANY = '568cc87c-5594-4db7-9425-076b552e2966'

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
