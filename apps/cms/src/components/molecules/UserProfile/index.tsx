import { ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar, Stack, Text } from '@chakra-ui/react'
import { UserProfileProps } from './types'

export const UserProfile = ({ name, imageSrc }: UserProfileProps) => (
    <Stack direction="row" alignItems="center" spacing={2}>
        <Text>{name}</Text>
        <ChevronDownIcon />
        <Avatar name={name} src={imageSrc} size="sm" />
    </Stack>
)
