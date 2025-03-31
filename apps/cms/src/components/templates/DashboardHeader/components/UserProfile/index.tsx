import { Avatar, Stack, Text } from '@chakra-ui/react'
import { ChevronDown } from 'lucide-react'

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
        <ChevronDown size={16} />
        <Avatar name={name} src={avatarUrl} size="sm" />
    </Stack>
)
