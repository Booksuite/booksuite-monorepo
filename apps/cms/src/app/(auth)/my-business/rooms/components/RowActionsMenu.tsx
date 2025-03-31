import { HousingUnitTypeFull, useUpdateHousingUnitType } from '@booksuite/sdk'

import { Copy, Edit, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { useConfirmationDialog } from '@/components/templates/ConfirmationDialog'
import { Box, MenuItem } from '@mui/material'

interface RowActionsMenuProps {
    item: HousingUnitTypeFull
}

export const HousingUnitTypeRowActionsMenu: React.FC<RowActionsMenuProps> = ({
    item,
}) => {
    const { push } = useRouter()

    const companyId = useCurrentCompanyId()
    const { mutate: updateHousingUnitType } = useUpdateHousingUnitType()
    const { showDialog } = useConfirmationDialog()

    const handleDuplicate = () => {
        // TODO: push(`/my-business/rooms/${item.id}/duplicate`)
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
                updateHousingUnitType({
                    companyId,
                    id: item.id,
                    data: {
                        published: !item.published,
                        name: item.name,
                        slug: item.slug,
                        order: item.order,
                        weekdaysPrice: item.weekdaysPrice ?? 0,
                        weekendPrice: item.weekendPrice ?? 0,
                        extraAdultPrice: item.extraAdultPrice ?? 0,
                        chargeExtraAdultHigherThan:
                            item.chargeExtraAdultHigherThan ?? 0,
                        housingUnits: item.housingUnits.map((housingUnit) => ({
                            id: housingUnit.id,
                            name: housingUnit.name,
                            housingUnitId: housingUnit.id,
                        })),
                        facilities: item.facilities.map((facility) => ({
                            facilityId: facility.id,
                            isFeatured: facility.isFeatured ?? undefined,
                        })),
                        medias: item.medias.map((media) => ({
                            mediaId: media.id,
                            isFeatured: media.isFeatured,
                        })),
                    },
                })
            },
        })
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
    }

    const handleEdit = () => {
        push(`/my-business/rooms/${item.id}`)
    }

    return (
        <Box>
            <MenuItem onClick={handleEdit}>
                <Edit size={16} />
                Editar
            </MenuItem>
            <MenuItem onClick={handleTogglePublished}>
                <Edit size={16} />
                {item.published ? 'Despublicar' : 'Publicar'}
            </MenuItem>
            <MenuItem onClick={handleDuplicate}>
                <Copy size={16} />
                Duplicar
            </MenuItem>
            <MenuItem onClick={handleDelete}>
                <Trash size={16} />
                Excluir
            </MenuItem>
        </Box>
    )
}
