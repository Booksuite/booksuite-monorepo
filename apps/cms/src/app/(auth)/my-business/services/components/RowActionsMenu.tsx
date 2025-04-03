import { ServiceFull, useUpdateService } from '@booksuite/sdk'
import {
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    styled,
} from '@mui/material'
import { Copy, Edit, Eye, EyeOff, Trash, MoreVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { useConfirmationDialog } from '@/components/templates/ConfirmationDialog'

interface RowActionsMenuProps {
    item: ServiceFull
}

const StyledIconButton = styled(IconButton)({
    borderRadius: '50%',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
})

export const ServiceRowActionsMenu: React.FC<RowActionsMenuProps> = ({
    item,
}) => {
    const { push } = useRouter()
    const companyId = useCurrentCompanyId()
    const { mutate: updateServiceData } = useUpdateService()
    const { showDialog } = useConfirmationDialog()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleDuplicate = () => {
        // TODO: push(`/my-business/rooms/${item.id}/duplicate`)
        handleClose()
    }

    const handleTogglePublished = () => {
        showDialog({
            title: 'Confirmar publicação',
            description: `Tem certeza que deseja ${
                item.published ? 'despublicar' : 'publicar'
            } "${item.name}"?`,
            confirmButtonText: 'Confirmar',
            variant: item.published ? 'warning' : 'info',
            onConfirm: () => {
                updateServiceData({
                    companyId,
                    id: item.id,
                    data: {
                        adults: item.adults,
                        availableHousingUnitTypes:
                            item?.availableHousingUnitTypes?.map((h) => ({
                                housingUnitTypeId: h.housingUnitType.id,
                            })),
                        availableWeekDays: item.availableWeekDays,
                        billingType: item.billingType,
                        description: item.description,
                        included: item.included,
                        minDaily: item.minDaily,
                        minNotice: item.minNotice,
                        name: item.name,
                        notes: item.notes,
                        onlineSale: item.onlineSale,
                        panelSale: item.panelSale,
                        price: item.price,
                        seasonalSale: item.seasonalSale,
                        seasonEnd: item.seasonEnd,
                        seasonStart: item.seasonStart,
                        published: !item.published,
                        medias: item.medias.map((media) => ({
                            mediaId: media.media.id,
                            order: media.order,
                        })),
                        coverMediaId: item.medias[0]?.media.id,
                    },
                })
            },
        })
        handleClose()
    }

    const handleDelete = () => {
        showDialog({
            title: 'Confirmar exclusão',
            description: `Tem certeza que deseja excluir "${item.name}"? Esta ação não pode ser desfeita.`,
            confirmButtonText: 'Excluir',
            variant: 'error',
            onConfirm: () => {
                // TODO: implement actual delete functionality
                // console.log('Deleted:', item.id)
            },
        })
        handleClose()
    }

    const handleEdit = () => {
        push(`/my-business/services/${item.id}`)
        handleClose()
    }

    return (
        <div>
            <StyledIconButton
                size="small"
                onClick={handleClick}
                aria-label="actions"
                aria-controls={open ? 'actions-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <MoreVertical size={16} />
            </StyledIconButton>
            <Menu
                id="actions-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'actions-button',
                }}
            >
                <MenuItem onClick={handleEdit}>
                    <ListItemIcon>
                        <Edit size={16} />
                    </ListItemIcon>
                    Editar
                </MenuItem>
                <MenuItem onClick={handleTogglePublished}>
                    <ListItemIcon>
                        {item.published ? (
                            <EyeOff size={16} />
                        ) : (
                            <Eye size={16} />
                        )}
                    </ListItemIcon>
                    {item.published ? 'Despublicar' : 'Publicar'}
                </MenuItem>
                <MenuItem onClick={handleDuplicate}>
                    <ListItemIcon>
                        <Copy size={16} />
                    </ListItemIcon>
                    Duplicar
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleDelete}>
                    <ListItemIcon>
                        <Trash size={16} color="red" />
                    </ListItemIcon>
                    <span style={{ color: 'red' }}>Excluir</span>
                </MenuItem>
            </Menu>
        </div>
    )
}
