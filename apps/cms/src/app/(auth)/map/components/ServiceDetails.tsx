import { useGetReservationById } from '@booksuite/sdk'
import { Avatar, Box, Button, Divider, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import {
    CalendarCheckIcon,
    CalendarPlus2Icon,
    ChevronDownIcon,
    ChevronUpIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { theme } from '@/common/theme'
import { SERVICE_BILLING_TYPE_MAP } from '../utils/constants'

interface ServiceDetailsProps {
    reservationId: string
    companyId: string
}

export const ServiceDetails: React.FC<ServiceDetailsProps> = ({
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

    if (!reservation) return null

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
            <Box
                sx={{
                    bgcolor: 'white',
                    p: 3,
                    borderRadius: 1,
                }}
            >
                <Stack
                    display="flex"
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography fontWeight={500}>Itens adicionais</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{
                            borderRadius: 1,
                            fontWeight: 600,
                            fontSize: 14,
                            width: 100,
                        }}
                    >
                        Alterar
                    </Button>
                </Stack>
                <Divider
                    sx={{
                        borderBottomWidth: '2px',
                        my: 4,
                    }}
                />
            </Box>
            {reservation.services && reservation.services.length > 0 ? (
                <>
                    {reservation.services.map((item, index) => {
                        let serviceImage = item.service.coverMedia?.url
                        if (
                            !serviceImage &&
                            Array.isArray(item.service.medias) &&
                            item.service.medias.length > 0 &&
                            item.service.medias[0] &&
                            item.service.medias[0].media
                        ) {
                            serviceImage = item.service.medias[0].media.url
                        }
                        return (
                            <Box
                                key={index}
                                mb={2}
                                sx={{
                                    borderRadius: 2,
                                    p: 2,
                                }}
                            >
                                <Stack
                                    direction="row"
                                    gap={2}
                                    alignItems="center"
                                >
                                    <Avatar
                                        variant="rounded"
                                        src={serviceImage || '/placeholder.png'}
                                        sx={{
                                            width: 75,
                                            height: 75,
                                        }}
                                    />
                                    <Stack flex={1}>
                                        <Typography
                                            fontWeight={600}
                                            color="blueGrey.800"
                                        >
                                            {item.service && item.service.name
                                                ? item.service.name
                                                : '-'}
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                        >
                                            <Typography
                                                variant="body2"
                                                color="blueGrey.600"
                                            >
                                                Quantidade:{' '}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="blueGrey.800"
                                                fontWeight={500}
                                            >
                                                {item.quantity}
                                            </Typography>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                        >
                                            <Typography
                                                variant="body2"
                                                color="blueGrey.600"
                                            >
                                                Valor{' '}
                                                {
                                                    SERVICE_BILLING_TYPE_MAP[
                                                        item.service.billingType
                                                    ]
                                                }
                                                :
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="blueGrey.800"
                                                fontWeight={500}
                                            >
                                                R${' '}
                                                {item.service &&
                                                item.service.price !== undefined
                                                    ? item.service.price.toLocaleString(
                                                          'pt-BR',
                                                          {
                                                              minimumFractionDigits: 2,
                                                          },
                                                      )
                                                    : '-'}
                                            </Typography>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                        >
                                            <Typography
                                                variant="body2"
                                                color="blueGrey.600"
                                            >
                                                Total:
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="blueGrey.800"
                                                fontWeight={500}
                                            >
                                                R${' '}
                                                {item.totalPrice !== undefined
                                                    ? item.totalPrice.toLocaleString(
                                                          'pt-BR',
                                                          {
                                                              minimumFractionDigits: 2,
                                                          },
                                                      )
                                                    : '-'}
                                            </Typography>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                        >
                                            <Typography
                                                variant="body2"
                                                color="blueGrey.600"
                                            >
                                                Agendamento:
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="blue.500"
                                                fontWeight={500}
                                            >
                                                {/* TODO: Fazer a lógica para verificar se o serviço está agendado */}
                                                {item.service &&
                                                item.service.seasonStart ? (
                                                    <Link
                                                        href={`/map`}
                                                        target="_blank"
                                                    >
                                                        <Stack
                                                            direction="row"
                                                            alignItems="center"
                                                            gap={1}
                                                            color="blue.500"
                                                        >
                                                            <CalendarCheckIcon
                                                                size={16}
                                                            />
                                                            {dayjs(
                                                                item.service
                                                                    .seasonStart,
                                                            ).format(
                                                                'DD/MM/YYYY',
                                                            )}
                                                        </Stack>
                                                    </Link>
                                                ) : (
                                                    <Link
                                                        href={`/map`}
                                                        target="_blank"
                                                    >
                                                        <Stack
                                                            direction="row"
                                                            alignItems="center"
                                                            gap={1}
                                                            color="blue.500"
                                                        >
                                                            <CalendarPlus2Icon
                                                                size={16}
                                                            />
                                                            Agendar
                                                        </Stack>
                                                    </Link>
                                                )}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Box>
                        )
                    })}
                    <Stack
                        direction="column"
                        gap={2}
                        justifyContent="space-between"
                        p={2}
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
                            justifyContent="space-between"
                            sx={{ cursor: 'pointer' }}
                        >
                            <Stack direction="row" gap={2} alignItems="center">
                                <Typography
                                    fontWeight={500}
                                    color="blueGrey.800"
                                >
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
                                {reservation.servicesPrice?.toLocaleString(
                                    'pt-BR',
                                    {
                                        minimumFractionDigits: 2,
                                    },
                                )}
                            </Typography>
                        </Stack>

                        {collapse.subTotal && (
                            <Stack direction="column">
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography color="blueGrey.600">
                                        Total base dos itens:
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
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography color="blueGrey.600">
                                        Ofertas:
                                    </Typography>
                                    ?
                                </Stack>
                            </Stack>
                        )}
                    </Stack>
                </>
            ) : (
                <Stack
                    bgcolor="blueGrey.50"
                    p={3}
                    borderRadius={1}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography color="blueGrey.500">
                        Nenhum serviço adicionado.
                    </Typography>
                </Stack>
            )}
        </Box>
    )
}
