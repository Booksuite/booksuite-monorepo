import { Box, useCheckbox } from '@chakra-ui/react'
import { RadioGroupItemProps } from './types'

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
    isChecked,
    onChange,
    children,
}: RadioGroupItemProps) => {
    const { getInputProps, getCheckboxProps } = useCheckbox({
        isChecked,
        onChange,
    })
    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as="label">
            <input {...input} hidden />
            <Box
                {...checkbox}
                px={3}
                py={2}
                borderRadius="full"
                border="1px solid"
                borderColor="gray.200"
                fontWeight="600"
                fontSize="sm"
                cursor="pointer"
                _checked={{
                    bg: 'blue.100',
                    borderColor: 'blue.100',
                }}
                _hover={{
                    bg: 'blue.50',
                    borderColor: 'blue.50',
                }}
            >
                {children}
            </Box>
        </Box>
    )
}
