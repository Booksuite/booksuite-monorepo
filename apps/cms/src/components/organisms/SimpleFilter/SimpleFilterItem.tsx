import { Box, useRadio } from '@chakra-ui/react'
import { SimpleFilterItemProps } from './types'

export function SimpleFilterItem(props: SimpleFilterItemProps) {
    const { getInputProps, getRadioProps } = useRadio(props)
    const input = getInputProps()
    const radio = getRadioProps()

    return (
        <Box as="label">
            <input {...input} />
            <Box
                {...radio}
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
                {props.children}
            </Box>
        </Box>
    )
}
