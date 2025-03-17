import {
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from '@chakra-ui/react'
import { Copy, Edit, Eye, EyeOff, Trash } from 'lucide-react'
import React from 'react'

import { Card } from '@/components/atoms/Card'
import { offerCouponsData } from '../utils/config'

interface OfferCouponCardProps {
    offerCoupon: offerCouponsData
    onClick?: (id: string) => void
}

export const OfferCouponCard: React.FC<OfferCouponCardProps> = ({
    offerCoupon,
    onClick,
}) => {
    return (
        <Card.Container
            key={offerCoupon.id}
            _hover={{
                bg: 'gray.200',
            }}
            cursor='pointer'
            onClick={() => onClick?.(offerCoupon.id)}
        >
            <Card.Section flex={1}>
                <Card.Title>{offerCoupon.name}</Card.Title>
                {offerCoupon.startDate && (
                    <Card.Text hideBelow="md">
                        {offerCoupon.startDate}
                    </Card.Text>
                )}

                {offerCoupon.endDate && (
                    <Card.Text hideBelow="md">{offerCoupon.endDate}</Card.Text>
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
