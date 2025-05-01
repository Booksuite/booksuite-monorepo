import { create } from 'zustand'

import { DRAWER_WIDTH, DRAWER_WIDTH_COLLAPSED } from '../constants'

type DashboardSidebarStore = {
    isOpen: boolean
    drawerWidth: number
    setIsOpen: (isOpen: boolean) => void
    toggleIsOpen: () => void
}

export const useDashboardSidebarStore = create<DashboardSidebarStore>(
    (set) => ({
        isOpen: true,
        drawerWidth: DRAWER_WIDTH,
        setIsOpen: (isOpen: boolean) =>
            set({
                isOpen,
                drawerWidth: isOpen ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED,
            }),
        toggleIsOpen: () =>
            set((state) => ({
                isOpen: !state.isOpen,
                drawerWidth: state.isOpen
                    ? DRAWER_WIDTH_COLLAPSED
                    : DRAWER_WIDTH,
            })),
    }),
)
