import { useGetReservationById } from '@booksuite/sdk'
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    IconButton,
    Stack,
    Tab,
    Tabs,
} from '@mui/material'
import { ChevronDownIcon, X as XIcon } from 'lucide-react'
import { useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'

import { AdditionalDetails } from './AdditionalDetails'
import { GuestDetails } from './GuestDetails'
import { HousingUnitDetails } from './HousingUnitDetails'
import { ServiceDetails } from './ServiceDetails'
import { SummaryDetails } from './SummaryDetails'

interface ReservationDetailsModalProps {
    open: boolean
    onClose: () => void
    reservationId: string
}

export const ReservationDetailsModal: React.FC<
    ReservationDetailsModalProps
> = ({ open, onClose, reservationId }) => {
    const [tab, setTab] = useState(0)

    const companyId = useCurrentCompanyId()

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
                        <HousingUnitDetails
                            reservationId={reservationId}
                            companyId={companyId}
                        />

                        <ServiceDetails
                            reservationId={reservationId}
                            companyId={companyId}
                        />
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
                        <GuestDetails
                            reservationId={reservationId}
                            companyId={companyId}
                        />

                        <SummaryDetails
                            reservationId={reservationId}
                            companyId={companyId}
                        />

                        <AdditionalDetails
                            reservationId={reservationId}
                            companyId={companyId}
                        />
                    </Box>
                </DialogContent>
            </Box>
        </Dialog>
    )
}
