import {
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from '@chakra-ui/react'
import { Copy, Edit, Eye, EyeOff, Trash } from 'lucide-react'
import { useRouter } from 'next/router'
import React from 'react'

import { Card } from '@/components/atoms/Card'
import { PackagesAndHolidaysData } from '../utils/config'

interface PackagesAndHolidaysCardProps {
    packagesAndHolidays: PackagesAndHolidaysData
    onClick?: (id: string) => void
}

export const PackagesAndHolidaysCard: React.FC<
    PackagesAndHolidaysCardProps
> = ({ packagesAndHolidays, onClick }) => {
    const { push } = useRouter()

    const thumbUrl =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH1Oq0QY5_gA_etkxd65QjN7bPszOBDdfdBQ&s'

    return (
        <Card.Container
            key={packagesAndHolidays.id}
            _hover={{
                bg: 'gray.200',
            }}
        >
            <Card.Section>
                {thumbUrl && (
                    <Card.Image
                        src={thumbUrl}
                        alt={packagesAndHolidays.name}
                        onClick={(e) => {
                            e.stopPropagation()
                            onClick?.(packagesAndHolidays.id)
                        }}
                        cursor="pointer"
                    />
                )}
            </Card.Section>
            <Card.Section flex={1}>
                <Card.Title>{packagesAndHolidays.name}</Card.Title>
                {packagesAndHolidays.startDate && (
                    <Card.Text hideBelow="md">
                        {packagesAndHolidays.startDate}
                    </Card.Text>
                )}
                {packagesAndHolidays.endDate && (
                    <Card.Text hideBelow="md">
                        {packagesAndHolidays.endDate}
                    </Card.Text>
                )}
            </Card.Section>
            <Card.Section>
                <Menu>
                    <MenuButton
                        as={Card.OptionDots}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <MenuList>
                        {/* TODO: Implementar campo published */}
                        <MenuItem icon={<EyeOff size={14} />}>
                            Despublicar
                        </MenuItem>
                        <MenuItem icon={<Eye size={14} />}>Publicar</MenuItem>
                        <MenuItem icon={<Edit size={14} />}>Editar</MenuItem>
                        <MenuItem icon={<Copy size={14} />}>Duplicar</MenuItem>
                        <MenuDivider />
                        <MenuItem icon={<Trash size={14} />} color="red.500">
                            Excluir
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Card.Section>
        </Card.Container>
    )
}
