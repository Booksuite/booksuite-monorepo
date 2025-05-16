import {
    Dialog,
    DialogContent,
    Box,
    Stack,
    Typography,
    Button,
    Tabs,
    Tab,
    IconButton,
    Divider,
    Tooltip,
    Link,
    Avatar,
    TextField,
} from '@mui/material'
import dayjs from 'dayjs'
import {
    ChevronDownIcon,
    X as XIcon,
    Edit2Icon,
    MessageCircleMoreIcon,
    ChevronUpIcon,
    CalendarIcon,
} from 'lucide-react'
import { useState } from 'react'
import { ReservationFull } from '@booksuite/sdk'
import { theme } from '@/common/theme'
import { Image } from '@/components/atoms/Image'
import { useGetHousingUnitTypeById } from '@booksuite/sdk'

interface ReservationDetailsModalProps {
    open: boolean
    onClose: () => void
    reservation: ReservationFull
}

function getHousingUnitTypeImage(housingUnitType: any): string {
    if (
        housingUnitType &&
        'medias' in housingUnitType &&
        Array.isArray(housingUnitType.medias) &&
        housingUnitType.medias[0] &&
        housingUnitType.medias[0].media &&
        housingUnitType.medias[0].media.url
    ) {
        return housingUnitType.medias[0].media.url
    }
    return '/placeholder.png'
}

export const ReservationDetailsModal: React.FC<
    ReservationDetailsModalProps
> = ({ open, onClose, reservation }) => {
    const [tab, setTab] = useState(0)
    const [collapse, setCollapse] = useState({
        prices: false,
        subTotal: false,
    })
    if (!reservation) return null

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
    const guestName =
        reservation.guestUser?.firstName +
        (reservation.guestUser?.lastName
            ? ' ' + reservation.guestUser.lastName
            : '')

    const { data: housingUnitTypeFull } = useGetHousingUnitTypeById({
        id: reservation.housingUnitTypeId!,
        companyId: reservation.companyId,
    })
    const housingImage =
        housingUnitTypeFull?.medias?.[0]?.media?.url || '/placeholder.png'

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    maxWidth: '85vw',
                    maxHeight: '90vh',
                    alignItems: 'center',
                    bgcolor: 'grey.100',
                },
            }}
        >
            <Box
                sx={{
                    p: 3,
                    position: 'relative',
                    bgcolor: 'grey.100',
                    top: 20,
                    height: '90vh',
                    width: '80vw',
                }}
            >
                <Stack
                    direction="row"
                    bgcolor={'white'}
                    gap={32}
                    py={3}
                    px={1}
                    borderRadius={1}
                    top={4}
                    mb={4}
                >
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            zIndex: 2,
                            color: 'grey.600',
                        }}
                    >
                        <XIcon size={22} />
                    </IconButton>
                    <Tabs value={tab} onChange={(_, v) => setTab(v)}>
                        <Tab
                            label="Dados Gerais"
                            sx={{ textTransform: 'none' }}
                        />
                        <Tab
                            label="Pagamentos"
                            sx={{ textTransform: 'none' }}
                        />
                        <Tab
                            label="Ficha do hóspede"
                            sx={{ textTransform: 'none' }}
                        />
                        <Tab label="Histórico" sx={{ textTransform: 'none' }} />
                    </Tabs>

                    <Stack direction="row" gap={3} mt={2}>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ width: 140, height: 38, fontWeight: 600 }}
                        >
                            Fazer check-in
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                width: 140,
                                height: 38,
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                            endIcon={<ChevronDownIcon size={18} />}
                        >
                            Opções
                        </Button>
                    </Stack>
                </Stack>
                <DialogContent
                    sx={{
                        display: 'flex',
                        gap: 4,
                        bgcolor: 'grey.100',
                        p: 0,
                        minHeight: 600,
                    }}
                >
                    <Stack direction="column" gap={4} mb={8}>
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
                                <Typography
                                    fontWeight={600}
                                    fontSize={20}
                                    color="blueGrey.800"
                                >
                                    Reserva{' '}
                                    {reservation.reservationCode ||
                                        reservation.id}
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
                            <Divider
                                sx={{ mb: 2, mt: 2, borderBottomWidth: '2px' }}
                            />
                            <Box
                                sx={{
                                    gap: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    p: 2,
                                }}
                            >
                                <Typography
                                    fontWeight={500}
                                    color="blueGrey.800"
                                >
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
                                                color={
                                                    theme.palette.blueGrey[500]
                                                }
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
                                            {dayjs(
                                                reservation.startDate,
                                            ).format('DD/MM/YYYY')}
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
                                        <Stack
                                            direction="row"
                                            gap={2}
                                            alignItems="center"
                                        >
                                            <CalendarIcon
                                                size={22}
                                                color={
                                                    theme.palette.blueGrey[500]
                                                }
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
                                            {dayjs(reservation.endDate).format(
                                                'DD/MM/YYYY',
                                            )}
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
                                <Typography
                                    fontWeight={500}
                                    color="blueGrey.800"
                                >
                                    Status do check-in
                                </Typography>
                                <Typography
                                    color="success.main"
                                    fontWeight={600}
                                >
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
                                <Typography
                                    fontWeight={500}
                                    color="blueGrey.800"
                                >
                                    Acomodação
                                </Typography>
                                <Stack direction="row" gap={2}>
                                    <Image
                                        src={housingImage}
                                        width={100}
                                        height={100}
                                        alt="Acomodação"
                                        borderRadius={1}
                                        border="1px solid"
                                    />
                                    <Stack
                                        display="flex"
                                        flexDirection="column"
                                        width={'42vw'}
                                    >
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
                                            <Typography
                                                color="blueGrey.800"
                                                fontWeight={500}
                                            >
                                                {reservation.housingUnitType
                                                    ?.name ||
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
                                            <Typography
                                                color="blueGrey.800"
                                                fontWeight={500}
                                            >
                                                {reservation.housingUnit
                                                    ?.name || 'Nenhuma unidade'}
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
                                            <Typography
                                                color="blueGrey.800"
                                                fontWeight={500}
                                            >
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
                                                    {reservation.rateOption
                                                        ?.name ||
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
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography
                                        fontWeight={500}
                                        color="blueGrey.800"
                                    >
                                        Hóspedes
                                    </Typography>
                                    <Typography
                                        color="blueGrey.800"
                                        fontWeight={500}
                                    >
                                        {totalGuests} hóspedes
                                    </Typography>
                                </Stack>
                                <Stack
                                    mt={2}
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography color="blueGrey.600">
                                        Adultos:
                                    </Typography>
                                    <Typography color="blueGrey.600">
                                        {reservation.adults || 0} adultos
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
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
                                    <Typography
                                        color="blueGrey.800"
                                        fontWeight={500}
                                    >
                                        R${' '}
                                        {reservation.finalPrice?.toLocaleString(
                                            'pt-BR',
                                            {
                                                minimumFractionDigits: 2,
                                            },
                                        )}
                                    </Typography>
                                </Stack>
                                {collapse.subTotal && (
                                    <>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                        >
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
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                        >
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
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                        >
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
                                    <Typography fontWeight={500}>
                                        Itens adicionais
                                    </Typography>
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
                            {reservation.services &&
                            reservation.services.length > 0 ? (
                                <>
                                    {reservation.services.map((item, idx) => {
                                        let serviceImage =
                                            item.service.coverMedia?.url
                                        if (
                                            !serviceImage &&
                                            Array.isArray(
                                                item.service.medias,
                                            ) &&
                                            item.service.medias.length > 0 &&
                                            item.service.medias[0] &&
                                            item.service.medias[0].media
                                        ) {
                                            serviceImage =
                                                item.service.medias[0].media.url
                                        }
                                        return (
                                            <Box
                                                key={idx}
                                                mb={2}
                                                sx={{
                                                    bgcolor: 'grey.50',
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
                                                        src={
                                                            serviceImage ||
                                                            '/placeholder.png'
                                                        }
                                                        sx={{
                                                            width: 56,
                                                            height: 56,
                                                        }}
                                                    />
                                                    <Stack flex={1}>
                                                        <Typography
                                                            fontWeight={600}
                                                        >
                                                            {item.service &&
                                                            item.service.name
                                                                ? item.service
                                                                      .name
                                                                : '-'}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            Quantidade:{' '}
                                                            {item.quantity}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            Valor unitário: R${' '}
                                                            {item.service &&
                                                            item.service
                                                                .price !==
                                                                undefined
                                                                ? item.service.price.toLocaleString(
                                                                      'pt-BR',
                                                                      {
                                                                          minimumFractionDigits: 2,
                                                                      },
                                                                  )
                                                                : '-'}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            Total: R${' '}
                                                            {item.totalPrice !==
                                                            undefined
                                                                ? item.totalPrice.toLocaleString(
                                                                      'pt-BR',
                                                                      {
                                                                          minimumFractionDigits: 2,
                                                                      },
                                                                  )
                                                                : '-'}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </Box>
                                        )
                                    })}
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        mt={2}
                                    >
                                        <Typography color="blueGrey.600">
                                            Total base dos itens
                                        </Typography>
                                        <Typography color="blueGrey.600">
                                            R${' '}
                                            {(reservation.services || [])
                                                .reduce(
                                                    (acc, item) =>
                                                        acc +
                                                        (item.totalPrice || 0),
                                                    0,
                                                )
                                                .toLocaleString('pt-BR', {
                                                    minimumFractionDigits: 2,
                                                })}
                                        </Typography>
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
                    </Stack>

                    <Box
                        sx={{
                            width: 370,
                            minWidth: 320,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
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
                                <Typography
                                    fontWeight={600}
                                    color="blueGrey.800"
                                >
                                    Titular da reserva
                                </Typography>
                                <Tooltip title="Editar">
                                    <IconButton size="small">
                                        <Edit2Icon
                                            size={18}
                                            color={theme.palette.blue[500]}
                                        />
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
                                <Typography
                                    fontWeight={600}
                                    color="blueGrey.700"
                                >
                                    {guestName}
                                </Typography>
                                {reservation.guestUser?.phone && (
                                    <Tooltip title="WhatsApp">
                                        <a
                                            href={`https://wa.me/${reservation.guestUser?.phone.replace(/\D/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <IconButton
                                                size="small"
                                                color="success"
                                            >
                                                <MessageCircleMoreIcon
                                                    size={18}
                                                    color={
                                                        theme.palette.success
                                                            .light
                                                    }
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

                        <Box
                            sx={{
                                bgcolor: 'white',
                                p: 3,
                                borderRadius: 1,
                                mb: 1,
                            }}
                        >
                            <Typography
                                fontWeight={600}
                                mb={1}
                                color="blueGrey.800"
                            >
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
                                <Stack
                                    direction="row"
                                    gap={2}
                                    alignItems="center"
                                >
                                    <Typography
                                        fontWeight={600}
                                        color="blueGrey.700"
                                    >
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
                                <Typography
                                    fontWeight={600}
                                    color="blueGrey.700"
                                >
                                    R${' '}
                                    {reservation.finalPrice?.toLocaleString(
                                        'pt-BR',
                                        {
                                            minimumFractionDigits: 2,
                                        },
                                    )}
                                </Typography>
                            </Stack>
                            {collapse.prices && (
                                <>
                                    <Stack
                                        mt={2}
                                        direction="row"
                                        justifyContent="space-between"
                                    >
                                        <Typography color="blueGrey.500">
                                            Hospedagem
                                        </Typography>
                                        <Typography color="blueGrey.500">
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

                        <Box
                            sx={{
                                bgcolor: 'white',
                                borderRadius: 1,
                                p: 3,
                            }}
                        >
                            <Typography
                                fontWeight={600}
                                mb={1}
                                color="blueGrey.800"
                            >
                                Detalhes adicionais
                            </Typography>
                            <Divider sx={{ borderBottomWidth: '2px' }} />
                            <Stack spacing={2} mt={2}>
                                <TextField
                                    label="Canal de Venda"
                                    value={reservation.saleChannel || ''}
                                    size="small"
                                    fullWidth
                                    InputProps={{ readOnly: true }}
                                />
                                <TextField
                                    label="Vendedor"
                                    value={
                                        reservation.sellerUser?.firstName || ''
                                    }
                                    size="small"
                                    fullWidth
                                    InputProps={{ readOnly: true }}
                                />
                                <TextField
                                    label="Observações (uso interno)"
                                    value={reservation.notes || ''}
                                    size="small"
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    InputProps={{ readOnly: true }}
                                />
                                <Stack gap={1}>
                                    {/* <Stack
                                        direction="row"
                                        gap={2}
                                        justifyContent="space-between"
                                    >
                                        <Typography
                                            fontWeight={500}
                                            color="blueGrey.500"
                                        >
                                            Cupom
                                        </Typography>
                                        <Typography color="blueGrey.700">
                                            {reservation?.couponCode}
                                        </Typography>
                                    </Stack> */}
                                    <Stack
                                        direction="row"
                                        gap={2}
                                        justifyContent="space-between"
                                    >
                                        <Typography
                                            fontWeight={500}
                                            color="blueGrey.500"
                                        >
                                            Data de criação
                                        </Typography>
                                        <Typography color="blueGrey.700">
                                            {dayjs(
                                                reservation.createdAt,
                                            ).format('DD/MM/YYYY')}
                                        </Typography>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        gap={2}
                                        justifyContent="space-between"
                                    >
                                        <Typography
                                            fontWeight={500}
                                            color="blueGrey.500"
                                        >
                                            Última modificação
                                        </Typography>
                                        <Typography color="blueGrey.700">
                                            {dayjs(
                                                reservation.updatedAt,
                                            ).format('DD/MM/YYYY')}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Stack width="100%" alignItems="flex-end">
                                    <Link
                                        href="#"
                                        underline="hover"
                                        sx={{ fontSize: 14, mt: 0.5 }}
                                    >
                                        Ver histórico
                                    </Link>
                                </Stack>
                            </Stack>
                        </Box>
                    </Box>
                </DialogContent>
            </Box>
        </Dialog>
    )
}
