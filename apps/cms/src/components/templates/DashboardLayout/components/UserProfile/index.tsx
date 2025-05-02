import { Avatar, Stack, Typography } from '@mui/material'
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
        <Typography variant="body1" fontWeight="medium">
            {name}
        </Typography>
        <ChevronDown size={16} />
        <Avatar src={avatarUrl} sizes="sm" />
    </Stack>
)
