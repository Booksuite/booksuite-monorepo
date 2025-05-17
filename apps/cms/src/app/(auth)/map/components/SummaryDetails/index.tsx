import { Reservation, useGetReservationById } from '@booksuite/sdk'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { useState } from 'react'

import { theme } from '@/common/theme'

interface SummaryDetailsProps {
    reservationId: string
    companyId: string
}

export const SummaryDetails: React.FC<SummaryDetailsProps> = ({
    reservationId,
    companyId,
}) => {
    const [collapse, setCollapse] = useState({
        prices: false,
    })

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

    return (
        <Box
            sx={{
                bgcolor: 'white',
                p: 3,
                borderRadius: 1,
                mb: 1,
            }}
        >
            <Typography fontWeight={600} mb={1} color="blueGrey.800">
                Resumo da reserva
            </Typography>
            <Divider sx={{ borderBottomWidth: '2px' }} />
            <Stack
                direction="row"
                justifyContent="space-between"
                mt={2}
                sx={{ cursor: 'pointer' }}
                onClick={() =>
                    setCollapse((c) => ({
                        ...c,
                        prices: !c.prices,
                    }))
                }
            >
                <Stack direction="row" gap={2} alignItems="center">
                    <Typography fontWeight={600} color="blueGrey.700">
                        Total da reserva
                    </Typography>
                    {collapse.prices ? (
                        <ChevronUpIcon
                            size={20}
                            color={theme.palette.blue[500]}
                        />
                    ) : (
                        <ChevronDownIcon
                            size={20}
                            color={theme.palette.blue[500]}
                        />
                    )}
                </Stack>
                <Typography fontWeight={600} color="blueGrey.700">
                    R${' '}
                    {reservation.finalPrice?.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                    })}
                </Typography>
            </Stack>
            {collapse.prices && (
                <>
                    <Stack
                        mt={2}
                        direction="row"
                        justifyContent="space-between"
                    >
                        <Typography color="blueGrey.500">Hospedagem</Typography>
                        <Typography color="blueGrey.500">
                            R${' '}
                            {reservation.basePrice?.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                            })}
                        </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography color="blueGrey.500">
                            Serviços e pacotes
                        </Typography>
                        <Typography color="blueGrey.500">
                            R${' '}
                            {reservation.servicesPrice?.toLocaleString(
                                'pt-BR',
                                {
                                    minimumFractionDigits: 2,
                                },
                            )}
                        </Typography>
                    </Stack>
                </>
            )}
        </Box>
    )
}
