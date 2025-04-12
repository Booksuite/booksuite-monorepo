export interface DashboardSidebarProps {
    isOpen: boolean
    onClose: () => void
    userImageSrc: string
    isCollapsed?: boolean
    onToggleCollapse?: () => void
}
