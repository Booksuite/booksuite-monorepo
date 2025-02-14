import { Search2Icon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'

export const SearchBox = () => (
    <InputGroup>
        <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
        </InputLeftElement>
        <Input type="text" placeholder="Pesquisar" />
    </InputGroup>
)
