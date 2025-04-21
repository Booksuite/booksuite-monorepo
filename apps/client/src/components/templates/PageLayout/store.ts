import { create } from 'zustand'

type PageLayoutStore = {
    hideNavbar: boolean
    hideFooter: boolean
    darkMode: boolean
    setHideNavbar: (hideNavbar: boolean) => void
    setHideFooter: (hideFooter: boolean) => void
    setDarkMode: (darkMode: boolean) => void
}

export const usePageLayoutStore = create<PageLayoutStore>((set) => ({
    hideNavbar: false,
    hideFooter: false,
    darkMode: false,
    setHideNavbar: (hideNavbar: boolean) => set({ hideNavbar }),
    setHideFooter: (hideFooter: boolean) => set({ hideFooter }),
    setDarkMode: (darkMode: boolean) => set({ darkMode }),
}))
