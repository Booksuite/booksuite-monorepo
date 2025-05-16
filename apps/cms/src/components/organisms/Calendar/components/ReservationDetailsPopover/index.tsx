import { ReservationFull } from '@booksuite/sdk'
import {
    Box,
    Button,
    Collapse,
    IconButton,
    Menu,
    MenuItem,
    Popover,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import {
    ChevronDownIcon,
    ChevronUpIcon,
    ExpandIcon,
    MailIcon,
    MessageCircleMoreIcon,
    XIcon,
} from 'lucide-react'
import { useRef, useState } from 'react'

import { ReservationDetailsModal } from '@/app/(auth)/map/components/ReservationDetailsModal'
import { theme } from '@/common/theme'
import { Logo } from '@/components/atoms/Logo'

interface ReservationDetailsPopoverProps {
    open: boolean
    anchorEl: HTMLElement | null
    onClose: () => void
    reservation?: ReservationFull
}

export const ReservationDetailsPopover: React.FC<
    ReservationDetailsPopoverProps
> = ({ open, anchorEl, onClose, reservation }) => {
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
    const [collapse, setCollapse] = useState({
        info: false,
        guests: false,
        items: false,
        payments: false,
        notes: false,
    })
    const [openModal, setOpenModal] = useState(false)
    const popoverRef = useRef<HTMLDivElement>(null)

    if (!reservation) return null

    const totalNights = dayjs(reservation.endDate).diff(
        dayjs(reservation.startDate),
        'day',
    )

    let totalGuests = 0

    if (reservation.adults) {
        totalGuests += reservation.adults
    }

    if (reservation.ageGroups) {
        totalGuests += reservation.ageGroups.reduce((acc, group) => {
            return acc + (group.ageGroup.value || 0)
        }, 0)
    }

    const checkinStatus =
        reservation.status === 'CHECKED_IN'
            ? { label: 'Efetuado', color: theme.palette.success.main }
            : { label: 'Pendente', color: theme.palette.warning.main }

    const TYPES_STATUS = {
        WAITING_PAYMENT: {
            label: 'Aguardando pagamento',
            color: theme.palette.warning.main,
        },
        CONFIRMED: { label: 'Confirmado', color: theme.palette.success.main },
        CHECKED_IN: { label: 'Efetuado', color: theme.palette.success.main },
        CHECKED_OUT: { label: 'Concluído', color: theme.palette.success.main },
        ABANDONED: { label: 'Abandonado', color: theme.palette.warning.main },
        CANCELLED: { label: 'Cancelado', color: theme.palette.error.main },
        PAYMENT_FAILED: {
            label: 'Falha no pagamento',
            color: theme.palette.error.main,
        },
        OVERBOOKED: {
            label: 'Excesso de hóspedes',
            color: theme.palette.warning.main,
        },
        WAITING_LIST: {
            label: 'Lista de espera',
            color: theme.palette.info.main,
        },
    }

    return (
        <>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                PaperProps={{
                    ref: popoverRef,
                    sx: {
                        width: 380,
                        height: 380,
                        maxWidth: 380,
                        maxHeight: 380,
                        borderRadius: 2,
                        p: 0,
                        m: 0,
                        overflow: 'hidden',
                        position: 'fixed',
                        zIndex: 1302,
                    },
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                        p: 2,
                        borderBottom: '1px solid #F0F1F3',
                        minHeight: 56,
                        position: 'sticky',
                        top: 0,
                        zIndex: 2,
                    }}
                >
                    <Typography
                        fontWeight={600}
                        fontSize={20}
                        color="blueGrey.700"
                    >
                        Reserva {reservation.reservationCode || reservation.id}
                    </Typography>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<ChevronDownIcon size={18} />}
                            sx={{
                                borderRadius: 1,
                                fontWeight: 600,
                                fontSize: 15,
                                px: 2,
                                py: 0.5,
                                boxShadow: 'none',
                                textTransform: 'none',
                            }}
                            onClick={(e) => setMenuAnchor(e.currentTarget)}
                        >
                            Opções
                        </Button>
                        <IconButton
                            size="small"
                            onClick={() => setOpenModal(true)}
                            sx={{ color: 'blueGrey.700' }}
                        >
                            <ExpandIcon
                                size={18}
                                color={theme.palette.blueGrey[700]}
                            />
                        </IconButton>
                        <IconButton
                            size="small"
                            sx={{ color: 'blueGrey.700' }}
                            onClick={onClose}
                        >
                            <XIcon
                                size={20}
                                color={theme.palette.blueGrey[700]}
                            />
                        </IconButton>
                    </Stack>
                </Stack>

                <Box sx={{ height: 324, overflowY: 'auto', bgcolor: '#fff' }}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        gap={4}
                        p={2}
                        sx={{
                            bgcolor: 'blueGrey.50',
                            borderRadius: 1,
                            m: 2,
                            mb: 0,
                        }}
                    >
                        <Stack
                            alignItems="center"
                            gap={2}
                            width={100}
                            borderRight={`2px solid ${theme.palette.blueGrey[100]}`}
                        >
                            <Box
                                sx={{
                                    width: 56,
                                    height: 56,
                                    bgcolor: 'blueGrey.100',
                                    fontSize: 32,
                                    fontWeight: 700,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    display: 'flex',
                                    borderRadius: '100%',
                                }}
                            >
                                <Logo.LogoIcon />
                            </Box>
                            <Typography
                                fontSize={16}
                                variant="body2"
                                color="blueGrey.700"
                            >
                                Booksuite
                            </Typography>
                        </Stack>
                        <Stack flex={1}>
                            <Typography
                                fontWeight={600}
                                fontSize={17}
                                color="blueGrey.700"
                            >
                                {reservation.guestUser?.firstName}{' '}
                                {reservation.guestUser?.lastName}
                            </Typography>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <Typography color="blueGrey.500" fontSize={15}>
                                    {reservation.guestUser?.email}
                                </Typography>
                                {reservation.guestUser?.email && (
                                    <Tooltip title="Enviar e-mail">
                                        <a
                                            href={`mailto:${reservation.guestUser.email}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <IconButton
                                                size="small"
                                                sx={{ p: 0.5 }}
                                            >
                                                <MailIcon
                                                    size={16}
                                                    color={
                                                        theme.palette.blue[500]
                                                    }
                                                />
                                            </IconButton>
                                        </a>
                                    </Tooltip>
                                )}
                            </Stack>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <Typography color="blueGrey.500" fontSize={15}>
                                    {reservation.guestUser?.phone}
                                </Typography>
                                {reservation.guestUser?.phone && (
                                    <Tooltip title="WhatsApp">
                                        <a
                                            href={`https://wa.me/${reservation.guestUser.phone.replace(/\D/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <IconButton
                                                size="small"
                                                sx={{ p: 0.5 }}
                                            >
                                                <MessageCircleMoreIcon
                                                    size={20}
                                                    color="#25D366"
                                                />
                                            </IconButton>
                                        </a>
                                    </Tooltip>
                                )}
                            </Stack>
                        </Stack>
                    </Stack>

                    <Box px={2} pt={2}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ cursor: 'pointer' }}
                            onClick={() =>
                                setCollapse((c) => ({ ...c, info: !c.info }))
                            }
                        >
                            <Typography
                                fontWeight={600}
                                fontSize={16}
                                color="blueGrey.700"
                            >
                                Informações da reserva
                            </Typography>
                            {collapse.info ? (
                                <ChevronUpIcon size={20} />
                            ) : (
                                <ChevronDownIcon size={20} />
                            )}
                        </Stack>
                        <Collapse in={collapse.info}>
                            <Stack spacing={0.5} mt={1}>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography color="blueGrey.500">
                                        Status da reserva
                                    </Typography>
                                    <Typography
                                        color={
                                            TYPES_STATUS[
                                                reservation.status as keyof typeof TYPES_STATUS
                                            ]?.color
                                        }
                                        fontWeight={500}
                                    >
                                        {
                                            TYPES_STATUS[
                                                reservation.status as keyof typeof TYPES_STATUS
                                            ]?.label
                                        }
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography color="blueGrey.500">
                                        Status do check-in
                                    </Typography>
                                    <Typography
                                        color={checkinStatus.color}
                                        fontWeight={500}
                                    >
                                        {checkinStatus.label}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography color="blueGrey.500">
                                        Entrada
                                    </Typography>
                                    <Typography
                                        color="blueGrey.700"
                                        fontWeight={500}
                                    >
                                        {dayjs(reservation.startDate).format(
                                            'DD/MM/YYYY',
                                        )}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography color="blueGrey.500">
                                        Saída
                                    </Typography>
                                    <Typography
                                        color="blueGrey.700"
                                        fontWeight={500}
                                    >
                                        {dayjs(reservation.endDate).format(
                                            'DD/MM/YYYY',
                                        )}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography color="blueGrey.500">
                                        Acomodação
                                    </Typography>
                                    <Typography
                                        color="blueGrey.700"
                                        fontWeight={500}
                                    >
                                        {reservation.housingUnitType?.name}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography color="blueGrey.500">
                                        Total de noites
                                    </Typography>
                                    <Typography
                                        color="blueGrey.700"
                                        fontWeight={500}
                                    >
                                        {totalNights} noite
                                        {totalNights === 1 ? '' : 's'}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography color="blueGrey.500">
                                        Opção de tarifa
                                    </Typography>
                                    <Typography
                                        color="blueGrey.700"
                                        fontWeight={500}
                                    >
                                        {reservation.rateOption?.name}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography color="blueGrey.500">
                                        Total de hóspedes
                                    </Typography>
                                    <Typography
                                        color="blueGrey.700"
                                        fontWeight={500}
                                    >
                                        {totalGuests} hóspede
                                        {totalGuests === 1 ? '' : 's'}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Collapse>
                    </Box>

                    <Box px={2} pt={2}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ cursor: 'pointer' }}
                            onClick={() =>
                                setCollapse((c) => ({
                                    ...c,
                                    guests: !c.guests,
                                }))
                            }
                        >
                            <Typography
                                fontWeight={600}
                                fontSize={16}
                                color="blueGrey.700"
                            >
                                Hóspedes
                            </Typography>
                            {collapse.guests ? (
                                <ChevronUpIcon size={20} />
                            ) : (
                                <ChevronDownIcon size={20} />
                            )}
                        </Stack>
                        <Collapse in={collapse.guests}>
                            <Stack spacing={0.5} mt={1}>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography color="blueGrey.500">
                                        Adultos
                                    </Typography>
                                    <Typography
                                        color="blueGrey.700"
                                        fontWeight={500}
                                    >
                                        {reservation.adults} adulto
                                        {reservation.adults === 1 ? '' : 's'}
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
                                            <Typography color="blueGrey.500">
                                                {group.ageGroup.initialAge} -{' '}
                                                {group.ageGroup.finalAge}
                                            </Typography>
                                            <Typography
                                                color="blueGrey.700"
                                                fontWeight={500}
                                            >
                                                {group.ageGroup.value}
                                            </Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </Stack>
                        </Collapse>
                    </Box>

                    {reservation.services?.length > 0 && (
                        <Box px={2} pt={2}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ cursor: 'pointer' }}
                                onClick={() =>
                                    setCollapse((c) => ({
                                        ...c,
                                        items: !c.items,
                                    }))
                                }
                            >
                                <Typography
                                    fontWeight={600}
                                    fontSize={16}
                                    color="blueGrey.700"
                                >
                                    Itens adicionais
                                </Typography>
                                {collapse.items ? (
                                    <ChevronUpIcon size={20} />
                                ) : (
                                    <ChevronDownIcon size={20} />
                                )}
                            </Stack>
                            <Collapse in={collapse.items}>
                                <Stack spacing={0.5} mt={1}>
                                    {reservation.services?.map((item, idx) => (
                                        <Stack
                                            key={idx}
                                            direction="row"
                                            justifyContent="space-between"
                                        >
                                            <Typography color="blueGrey.500">
                                                {item.service.name}
                                            </Typography>
                                            <Typography
                                                color="blueGrey.700"
                                                fontWeight={500}
                                            >
                                                R${' '}
                                                {item.totalPrice.toLocaleString(
                                                    'pt-BR',
                                                    {
                                                        minimumFractionDigits: 2,
                                                    },
                                                )}
                                            </Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </Collapse>
                        </Box>
                    )}

                    <Box px={2} pt={2}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ cursor: 'pointer' }}
                            onClick={() =>
                                setCollapse((c) => ({
                                    ...c,
                                    payments: !c.payments,
                                }))
                            }
                        >
                            <Typography
                                fontWeight={600}
                                fontSize={16}
                                color="blueGrey.700"
                            >
                                Resumo de pagamentos
                            </Typography>
                            {collapse.payments ? (
                                <ChevronUpIcon size={20} />
                            ) : (
                                <ChevronDownIcon size={20} />
                            )}
                        </Stack>
                        <Collapse in={collapse.payments}>
                            <Stack spacing={0.5} mt={1}>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography color="blueGrey.500">
                                        Total da reserva
                                    </Typography>
                                    <Typography
                                        color="blueGrey.700"
                                        fontWeight={500}
                                    >
                                        R${' '}
                                        {reservation.finalPrice.toLocaleString(
                                            'pt-BR',
                                            {
                                                minimumFractionDigits: 2,
                                            },
                                        )}
                                    </Typography>
                                </Stack>
                                {/* <Stack
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Typography color="blueGrey.500">
                                    Recebido
                                </Typography>
                                <Typography
                                    color="blueGrey.700"
                                    fontWeight={500}
                                >
                                    R${' '}
                                    {reservation.received.toLocaleString(
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
                                    Valor em aberto
                                </Typography>
                                <Typography
                                    color="blueGrey.700"
                                    fontWeight={500}
                                >
                                    R${' '}
                                    {reservation.openValue.toLocaleString(
                                        'pt-BR',
                                        {
                                            minimumFractionDigits: 2,
                                        },
                                    )}
                                </Typography>
                            </Stack> */}
                            </Stack>
                        </Collapse>
                    </Box>

                    {reservation.notes && (
                        <Box px={2} pt={2}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ cursor: 'pointer' }}
                                onClick={() =>
                                    setCollapse((c) => ({
                                        ...c,
                                        notes: !c.notes,
                                    }))
                                }
                            >
                                <Typography
                                    fontWeight={600}
                                    fontSize={16}
                                    color="blueGrey.700"
                                >
                                    Observações do hóspede
                                </Typography>
                                {collapse.notes ? (
                                    <ChevronUpIcon size={20} />
                                ) : (
                                    <ChevronDownIcon size={20} />
                                )}
                            </Stack>
                            <Collapse in={collapse.notes}>
                                <Typography
                                    color="blueGrey.500"
                                    fontSize={15}
                                    mt={1}
                                >
                                    {reservation.notes}
                                </Typography>
                            </Collapse>
                        </Box>
                    )}
                </Box>

                <Menu
                    anchorEl={menuAnchor}
                    open={Boolean(menuAnchor)}
                    onClose={() => setMenuAnchor(null)}
                >
                    <MenuItem onClick={() => setMenuAnchor(null)}>
                        Editar reserva
                    </MenuItem>
                    <MenuItem onClick={() => setMenuAnchor(null)}>
                        Cancelar reserva
                    </MenuItem>
                    <MenuItem onClick={() => setMenuAnchor(null)}>
                        Check-in
                    </MenuItem>
                    <MenuItem onClick={() => setMenuAnchor(null)}>
                        Check-out
                    </MenuItem>
                </Menu>
            </Popover>
            <ReservationDetailsModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                reservation={reservation}
            />
        </>
    )
}
