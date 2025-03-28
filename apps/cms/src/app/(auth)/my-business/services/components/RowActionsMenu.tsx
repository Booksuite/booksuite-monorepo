import { ServiceFull, useUpdateService } from '@booksuite/sdk'
import {
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from '@chakra-ui/react'
import { Copy, Edit, EllipsisVertical, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { useConfirmationDialog } from '@/components/templates/ConfirmationDialog'

interface RowActionsMenuProps {
    item: ServiceFull
}

export const ServiceRowActionsMenu: React.FC<RowActionsMenuProps> = ({
    item,
}) => {
    const { push } = useRouter()
    const companyId = useCurrentCompanyId()
    const { mutate: updateServiceData } = useUpdateService()
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
        push(`/my-business/services/${item.id}`)
    }

    return (
        <Menu>
            <MenuButton
                rounded="full"
                variant="ghost"
                size="sm"
                as={IconButton}
                icon={<EllipsisVertical size={16} />}
            />
            <MenuList>
                <MenuItem icon={<Edit size={16} />} onClick={handleEdit}>
                    Editar
                </MenuItem>
                <MenuItem
                    icon={<Edit size={16} />}
                    onClick={handleTogglePublished}
                >
                    {item.published ? 'Despublicar' : 'Publicar'}
                </MenuItem>
                <MenuItem icon={<Copy size={16} />} onClick={handleDuplicate}>
                    Duplicar
                </MenuItem>
                <MenuDivider />
                <MenuItem icon={<Trash size={16} />} onClick={handleDelete}>
                    Excluir
                </MenuItem>
            </MenuList>
        </Menu>
    )
}
