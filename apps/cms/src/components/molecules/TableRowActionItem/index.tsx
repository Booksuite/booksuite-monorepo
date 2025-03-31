import {
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuItemProps,
} from '@mui/material'
import { LucideProps } from 'lucide-react'

export interface TableRowActionItemProps
    extends Omit<MenuItemProps, 'children'> {
    Icon: React.ElementType<LucideProps>
    label: string
}

export const TableRowActionItem: React.FC<TableRowActionItemProps> = ({
    Icon,
    label,
    ...props
}) => {
    return (
        <MenuItem {...props}>
            <ListItemIcon>
                <Icon size={16} />
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
        </MenuItem>
    )
}
