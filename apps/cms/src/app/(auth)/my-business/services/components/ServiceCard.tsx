import { ServiceFull } from '@booksuite/sdk'
import { Menu, MenuItem, ListItemIcon, Divider, styled } from '@mui/material'
import { Copy, Edit, Eye, EyeOff, Trash } from 'lucide-react'
import pluralize from 'pluralize'

import { formatCurrency } from '@/common/utils/currency'
import { Card } from '@/components/atoms/Card'
import { useState } from 'react'

interface ServiceCardProps {
    service: ServiceFull
    onClick?: (id: string) => void
}

const OptionDotsButton = styled(Card.OptionDots)({
    padding: '8px',
    borderRadius: '50%',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
})

export const ServiceCard: React.FC<ServiceCardProps> = ({
    service,
    onClick,
}) => {
    const thumbUrl = service.medias[0]?.media.url
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Card.Container
            key={service.id}
            sx={{
                '&:hover': {
                    bgcolor: 'action.hover',
                },
            }}
        >
            <Card.Section>
                {thumbUrl && (
                    <Card.Image
                        src={thumbUrl}
                        alt={service.name}
                        onClick={() => onClick?.(service.id)}
                        style={{ cursor: 'pointer' }}
                    />
                )}
            </Card.Section>
            <Card.Section style={{ flex: 1 }}>
                <Card.Title>{service.name}</Card.Title>
                {service.price && (
                    <Card.Text sx={{ display: { xs: 'none', md: 'block' } }}>
                        {formatCurrency(service.price)}
                    </Card.Text>
                )}
                {(service.onlineSale ||
                    service.panelSale ||
                    service.seasonalSale) && (
                    <Card.Text>
                        {[
                            service.onlineSale && 'Site',
                            service.panelSale && 'Painel',
                            service.seasonalSale && 'Sazonal',
                        ]
                            .filter(Boolean)
                            .join(' / ')}
                    </Card.Text>
                )}

                {service.published && (
                    <Card.Text>
                        {pluralize(
                            service.published ? 'Publicado' : 'Não publicado',
                        )}
                    </Card.Text>
                )}
            </Card.Section>
            <Card.Section>
                <div>
                    <OptionDotsButton onClick={handleClick} />
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* TODO: Implementar campo published */}
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <EyeOff size={14} />
                            </ListItemIcon>
                            Despublicar
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Eye size={14} />
                            </ListItemIcon>
                            Publicar
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Edit size={14} />
                            </ListItemIcon>
                            Editar
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Copy size={14} />
                            </ListItemIcon>
                            Duplicar
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Trash size={14} color="error" />
                            </ListItemIcon>
                            <span style={{ color: 'red' }}>Excluir</span>
                        </MenuItem>
                    </Menu>
                </div>
            </Card.Section>
        </Card.Container>
    )
}
