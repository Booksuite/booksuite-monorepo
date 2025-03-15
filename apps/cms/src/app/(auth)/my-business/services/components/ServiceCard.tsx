import { ServiceFull } from '@booksuite/sdk'
import {
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from '@chakra-ui/react'
import { Copy, Edit, Eye, EyeOff, Trash } from 'lucide-react'
import pluralize from 'pluralize'

import { formatCurrency } from '@/common/utils/currency'
import { Card } from '@/components/atoms/Card'

interface ServiceCardProps {
    service: ServiceFull
    onClick?: (id: string) => void
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
    service,
    onClick,
}) => {
    const thumbUrl = service.medias[0]?.media.url

    return (
        <Card.Container
            key={service.id}
            _hover={{
                bg: 'gray.200',
            }}
        >
            <Card.Section>
                {thumbUrl && (
                    <Card.Image
                        src={thumbUrl}
                        alt={service.name}
                        onClick={() => onClick?.(service.id)}
                        cursor="pointer"
                    />
                )}
            </Card.Section>
            <Card.Section flex={1}>
                <Card.Title>{service.name}</Card.Title>
                {service.price && (
                    <Card.Text hideBelow="md">
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
                <Menu>
                    {({}) => (
                        <>
                            <MenuButton
                                as={Card.OptionDots}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <MenuList>
                                {/* TODO: Implementar campo published */}
                                <MenuItem icon={<EyeOff size={14} />}>
                                    Despublicar
                                </MenuItem>
                                <MenuItem icon={<Eye size={14} />}>
                                    Publicar
                                </MenuItem>
                                <MenuItem icon={<Edit size={14} />}>
                                    Editar
                                </MenuItem>
                                <MenuItem icon={<Copy size={14} />}>
                                    Duplicar
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem
                                    icon={<Trash size={14} />}
                                    color="red.500"
                                >
                                    Excluir
                                </MenuItem>
                            </MenuList>
                        </>
                    )}
                </Menu>
            </Card.Section>
        </Card.Container>
    )
}
