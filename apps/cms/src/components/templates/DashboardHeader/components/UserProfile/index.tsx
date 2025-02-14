import { ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar, Stack, Text } from '@chakra-ui/react'

interface UserProfileProps {
    name: string
    avatarUrl: string
}

export const UserProfile: React.FC<UserProfileProps> = ({
    name,
    avatarUrl,
}) => (
    <Stack direction="row" alignItems="center" spacing={2}>
        <Text>{name}</Text>
        <ChevronDownIcon />
        <Avatar name={name} src={avatarUrl} size="sm" />
    </Stack>
)
