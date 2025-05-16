import { useGetReservationById } from '@booksuite/sdk'
import {
    Box,
    Divider,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material'
import { Edit2Icon, MessageCircleMoreIcon } from 'lucide-react'

import { theme } from '@/common/theme'

interface GuestDetailsProps {
    reservationId: string
    companyId: string
}

export const GuestDetails: React.FC<GuestDetailsProps> = ({
    reservationId,
    companyId,
}) => {
    const { data: reservation } = useGetReservationById(
        {
            id: reservationId,
            companyId: companyId,
        },
        {
            query: {
                enabled: !!reservationId,
            },
        },
    )

    if (!reservation) return null

    const guestName =
        reservation.guestUser?.firstName +
        (reservation.guestUser?.lastName
            ? ' ' + reservation.guestUser.lastName
            : '')
    return (
        <Box
            sx={{
                bgcolor: 'white',
                borderRadius: 1,
                p: 3,
                mb: 1,
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <Typography fontWeight={600} color="blueGrey.800">
                    Titular da reserva
                </Typography>
                <Tooltip title="Editar">
                    <IconButton size="small">
                        <Edit2Icon size={18} color={theme.palette.blue[500]} />
                    </IconButton>
                </Tooltip>
            </Stack>
            <Divider sx={{ borderBottomWidth: '2px' }} />
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mt={2}
            >
                <Typography fontWeight={600} color="blueGrey.700">
                    {guestName}
                </Typography>
                {reservation.guestUser?.phone && (
                    <Tooltip title="WhatsApp">
                        <a
                            href={`https://wa.me/${reservation.guestUser?.phone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <IconButton size="small" color="success">
                                <MessageCircleMoreIcon
                                    size={18}
                                    color={theme.palette.success.light}
                                />
                            </IconButton>
                        </a>
                    </Tooltip>
                )}
            </Stack>
            <Typography variant="body2" color="blueGrey.500">
                {reservation.guestUser?.email}
            </Typography>
            <Typography variant="body2" color="blueGrey.500">
                {reservation.guestUser?.phone}
            </Typography>
        </Box>
    )
}
