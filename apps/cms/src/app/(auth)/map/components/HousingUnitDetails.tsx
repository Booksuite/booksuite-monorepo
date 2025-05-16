import {
    useGetHousingUnitTypeById,
    useGetReservationById,
} from '@booksuite/sdk'
import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { CalendarIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { useState } from 'react'

import { theme } from '@/common/theme'
import { Image } from '@/components/atoms/Image'

interface HousingUnitDetailsProps {
    reservationId: string
    companyId: string
}
export const HousingUnitDetails: React.FC<HousingUnitDetailsProps> = ({
    reservationId,
    companyId,
}) => {
    const [collapse, setCollapse] = useState({
        subTotal: false,
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

    const { data: housingUnitTypeFull } = useGetHousingUnitTypeById(
        {
            id: reservation?.housingUnitTypeId ?? '',
            companyId: reservation?.companyId ?? '',
        },
        {
            query: {
                enabled:
                    !!reservation?.housingUnitTypeId &&
                    !!reservation?.companyId,
            },
        },
    )

    if (!reservation) return null

    const housingImage =
        housingUnitTypeFull?.medias?.[0]?.media?.url || '/placeholder.png'

    const totalNights = dayjs(reservation.endDate).diff(
        dayjs(reservation.startDate),
        'day',
    )
    const totalGuests =
        (reservation.adults || 0) +
        (reservation.ageGroups?.reduce(
            (acc, group) => acc + (group.ageGroup.value || 0),
            0,
        ) || 0)

    return (
        <Box
            sx={{
                flex: 1,
                minWidth: 420,
                bgcolor: 'white',
                p: 4,
                borderRadius: 2,
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <Typography fontWeight={600} fontSize={20} color="blueGrey.800">
                    Reserva {reservation.reservationCode || reservation.id}
                </Typography>
                <Stack direction="row" gap={2}>
                    <Button
                        variant="text"
                        color="primary"
                        sx={{
                            bgcolor: 'grey.100',
                            p: 2,
                            gap: 2,
                            borderRadius: 1,
                            height: 35,
                            fontWeight: 600,
                            fontSize: 15,
                            '&:hover': { bgcolor: 'grey.200' },
                        }}
                        endIcon={<ChevronDownIcon size={16} />}
                    >
                        {reservation.status}
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            p: 2,
                            borderRadius: 1,
                            width: 100,
                            height: 35,
                            fontWeight: 600,
                        }}
                    >
                        Alterar
                    </Button>
                </Stack>
            </Stack>
            <Divider sx={{ mb: 2, mt: 2, borderBottomWidth: '2px' }} />
            <Box
                sx={{
                    gap: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                }}
            >
                <Typography fontWeight={500} color="blueGrey.800">
                    Período da hospedagem
                </Typography>
                <Stack direction="row" gap={4}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            bgcolor: 'blueGrey.50',
                            p: 4,
                            borderRadius: 1,
                            width: 350,
                            justifyContent: 'space-between',
                        }}
                    >
                        <Stack direction="row" gap={2}>
                            <CalendarIcon
                                size={22}
                                color={theme.palette.blueGrey[500]}
                            />
                            <Typography
                                variant="body2"
                                color="blueGrey.500"
                                fontWeight={500}
                                fontSize={16}
                            >
                                Data de chegada:
                            </Typography>
                        </Stack>
                        <Typography
                            color="blueGrey.700"
                            fontWeight={600}
                            fontSize={16}
                        >
                            {dayjs(reservation.startDate).format('DD/MM/YYYY')}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            bgcolor: 'blueGrey.50',
                            p: 4,
                            borderRadius: 1,
                            width: 350,
                            justifyContent: 'space-between',
                        }}
                    >
                        <Stack direction="row" gap={2} alignItems="center">
                            <CalendarIcon
                                size={22}
                                color={theme.palette.blueGrey[500]}
                            />
                            <Typography
                                variant="body2"
                                color="blueGrey.500"
                                fontWeight={500}
                                fontSize={16}
                            >
                                Data de saída:
                            </Typography>
                        </Stack>
                        <Typography
                            color="blueGrey.700"
                            fontWeight={600}
                            fontSize={16}
                        >
                            {dayjs(reservation.endDate).format('DD/MM/YYYY')}
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            <Box
                mb={2}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                }}
            >
                <Typography fontWeight={500} color="blueGrey.800">
                    Status do check-in
                </Typography>
                <Typography color="success.main" fontWeight={600}>
                    Efetuado
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'start',
                    flexDirection: 'column',
                    p: 2,
                    gap: 2,
                }}
            >
                <Typography fontWeight={500} color="blueGrey.800">
                    Acomodação
                </Typography>
                <Stack direction="row" gap={2}>
                    <Image
                        src={housingImage}
                        width={100}
                        height={100}
                        alt="Acomodação"
                        borderRadius={1}
                    />
                    <Stack display="flex" flexDirection="column" width={'42vw'}>
                        <Stack
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            <Typography color="blueGrey.500">
                                Categoria:
                            </Typography>
                            <Typography color="blueGrey.800" fontWeight={500}>
                                {reservation.housingUnitType?.name ||
                                    'Nenhuma categoria'}
                            </Typography>
                        </Stack>
                        <Stack
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            <Typography color="blueGrey.500">
                                Unidade:
                            </Typography>
                            <Typography color="blueGrey.800" fontWeight={500}>
                                {reservation.housingUnit?.name ||
                                    'Nenhuma unidade'}
                            </Typography>
                        </Stack>
                        <Stack
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            <Typography color="blueGrey.500">
                                Total de noites:
                            </Typography>
                            <Typography color="blueGrey.800" fontWeight={500}>
                                {totalNights} noites
                            </Typography>
                        </Stack>
                        <Stack
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            <Typography color="blueGrey.500">
                                Opções de tarifa:
                            </Typography>
                            <Stack>
                                <Typography
                                    color="blueGrey.800"
                                    fontWeight={500}
                                >
                                    {reservation.rateOption?.name ||
                                        'Nenhuma opção de tarifa'}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                }}
            >
                <Stack direction="row" justifyContent="space-between">
                    <Typography fontWeight={500} color="blueGrey.800">
                        Hóspedes
                    </Typography>
                    <Typography color="blueGrey.800" fontWeight={500}>
                        {totalGuests} hóspedes
                    </Typography>
                </Stack>
                <Stack mt={2} direction="row" justifyContent="space-between">
                    <Typography color="blueGrey.600">Adultos:</Typography>
                    <Typography color="blueGrey.600">
                        {reservation.adults || 0} adultos
                    </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    {reservation.ageGroups?.map((group) => (
                        <Stack
                            key={group.ageGroup.id}
                            direction="row"
                            justifyContent="space-between"
                        >
                            <Typography color="blueGrey.600">
                                {group.ageGroup.initialAge} -{' '}
                                {group.ageGroup.finalAge}:{' '}
                                {group.ageGroup.value}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </Box>
            <Box
                sx={{
                    p: 2,
                    gap: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    onClick={() =>
                        setCollapse((c) => ({
                            ...c,
                            subTotal: !c.subTotal,
                        }))
                    }
                >
                    <Stack
                        direction="row"
                        gap={2}
                        alignItems="center"
                        sx={{ cursor: 'pointer' }}
                    >
                        <Typography fontWeight={500} color="blueGrey.800">
                            Sub-total
                        </Typography>
                        {collapse.subTotal ? (
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
                    <Typography color="blueGrey.800" fontWeight={500}>
                        R${' '}
                        {reservation.finalPrice?.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                        })}
                    </Typography>
                </Stack>
                {collapse.subTotal && (
                    <>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography color="blueGrey.600">
                                Total base das diárias
                            </Typography>
                            <Typography color="blueGrey.600">
                                R${' '}
                                {reservation.basePrice?.toLocaleString(
                                    'pt-BR',
                                    {
                                        minimumFractionDigits: 2,
                                    },
                                )}
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography color="blueGrey.600">
                                Opções de tarifa
                            </Typography>
                            <Typography color="blueGrey.600">
                                R${' '}
                                {reservation.rateOptionPrice?.toLocaleString(
                                    'pt-BR',
                                    {
                                        minimumFractionDigits: 2,
                                    },
                                )}
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography color="blueGrey.600">
                                Hóspedes adicionais
                            </Typography>
                            <Typography color="blueGrey.600">
                                R${' '}
                                {reservation.childrenPrice?.toLocaleString(
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
        </Box>
    )
}
