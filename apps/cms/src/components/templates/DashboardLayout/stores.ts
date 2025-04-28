import { BoxProps } from '@mui/material'
import { create } from 'zustand'

interface DashboardLayoutStore {
    isCollapsed: boolean
    fullWidth: boolean
    bgcolor: BoxProps['bgcolor']
    setIsCollapsed: (isCollapsed: boolean) => void
    setFullWidth: (fullWidth: boolean) => void
    setBgcolor: (bgcolor: BoxProps['bgcolor']) => void
}

export const useDashboardLayoutStore = create<DashboardLayoutStore>((set) => ({
    isCollapsed: false,
    fullWidth: false,
    bgcolor: 'background.default',
    setIsCollapsed: (isCollapsed: boolean) => set({ isCollapsed }),
    setFullWidth: (fullWidth: boolean) => set({ fullWidth }),
    setBgcolor: (bgcolor: BoxProps['bgcolor']) => set({ bgcolor }),
}))
