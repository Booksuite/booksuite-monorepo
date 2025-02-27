import { Tag } from '@chakra-ui/react'

type ChipProps = {
    label: string
    isSelected?: boolean
    onClick: () => void
}

export const Chip: React.FC<ChipProps> = ({ label, isSelected, onClick }) => {
    return (
        <Tag
            cursor="pointer"
            px={3}
            py={2}
            borderRadius="full"
            border="1px solid"
            borderColor="gray.200"
            fontWeight="600"
            fontSize="sm"
            _checked={{
                bg: 'blue.100',
                borderColor: 'blue.100',
            }}
            _hover={{
                bg: 'blue.50',
                borderColor: 'blue.50',
            }}
            bg={isSelected ? 'blue.100' : 'transparent'}
            onClick={onClick}
        >
            {label}
        </Tag>
    )
}
