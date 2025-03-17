import { HousingUnitTypeFull } from '@booksuite/sdk'
import pluralize from 'pluralize'

import { formatCurrency } from '@/common/utils/currency'
import { Card } from '@/components/atoms/Card'
import {
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from '@chakra-ui/react'
import { Copy, Edit, Eye, EyeOff, Trash } from 'lucide-react'

interface HousingUnitTypeCardProps {
    housingUnitType: HousingUnitTypeFull
    onClick?: (id: string) => void
}

export const HousingUnitTypeCard: React.FC<HousingUnitTypeCardProps> = ({
    housingUnitType,
    onClick,
}) => {
    const thumbUrl = housingUnitType.medias[0]?.media.url

    return (
        <Card.Container
            key={housingUnitType.id}
            _hover={{
                bg: 'gray.200',
            }}
        >
            <Card.Section>
                {thumbUrl && (
                    <Card.Image
                        src={thumbUrl}
                        alt={housingUnitType.name}
                        onClick={() => onClick?.(housingUnitType.id)}
                        cursor="pointer"
                    />
                )}
            </Card.Section>
            <Card.Section flex={1}>
                <Card.Title>{housingUnitType.name}</Card.Title>
                {housingUnitType.weekdaysPrice && (
                    <Card.Text hideBelow="md">
                        {formatCurrency(housingUnitType.weekdaysPrice)}
                    </Card.Text>
                )}
                {housingUnitType.weekendPrice && (
                    <Card.Text>
                        {formatCurrency(housingUnitType.weekendPrice)}
                    </Card.Text>
                )}
                <Card.Text hideBelow="md">
                    {housingUnitType.maxGuests || 1}{' '}
                    {pluralize('hóspede', housingUnitType.maxGuests || 1)}
                </Card.Text>
                <Card.Text>
                    {housingUnitType.housingUnits.length}{' '}
                    {pluralize('unidade', housingUnitType.housingUnits.length)}
                </Card.Text>
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
