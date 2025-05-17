import { ReservationService, ServiceFull } from '@booksuite/sdk'
import SearchIcon from '@mui/icons-material/Search'
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

import {
    calculateTotalStay,
    getNewReservationServicesArray,
} from '../../utils/helpers'

import { ServiceItem } from './ServiceItem'

interface ServiceModalProps {
    open: boolean
    onClose: () => void
    onUpdateServices: (newReservationServices: ReservationService[]) => void
    initialServices: ReservationService[]
    services: ServiceFull[]
    formValues: {
        adults: number
        startDate: string
        endDate: string
    }
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
    open,
    onClose,
    onUpdateServices,
    initialServices,
    services,
    formValues,
}) => {
    const [selectedServices, setSelectedServices] = useState<
        ReservationService[]
    >([])
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        setSelectedServices(initialServices)
    }, [initialServices])

    const handleUpdateServices = (
        service: ServiceFull,
        newQuantity: number,
    ) => {
        const updatedServices = getNewReservationServicesArray(
            selectedServices,
            service,
            newQuantity,
            formValues.adults ?? 0,
            calculateTotalStay(
                formValues.startDate ?? '',
                formValues.endDate ?? '',
            ),
        )

        setSelectedServices(updatedServices)
    }

    const handleConfirmServices = () => {
        onUpdateServices(selectedServices)
        onClose()
    }

    const filteredServices = services.filter((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ pb: 0 }}>
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            color: '#1F2937',
                            mb: 1,
                        }}
                    >
                        Itens Adicionais
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: '1rem',
                            color: '#6B7280',
                        }}
                    >
                        Selecione os itens desejados
                    </Typography>
                </Box>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Pesquisar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: '#9CA3AF' }} />
                                </InputAdornment>
                            ),
                            sx: {
                                bgcolor: '#F9FAFB',
                                '& fieldset': {
                                    borderColor: '#E5E7EB',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#D1D5DB',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'blue.900',
                                },
                            },
                        },
                    }}
                    sx={{ mb: 3 }}
                />
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {filteredServices?.map((serv) => {
                        const currentService = selectedServices.find(
                            (s) => s.service.id === serv.id,
                        )
                        const currentQty = currentService?.quantity ?? 0

                        return (
                            <ServiceItem
                                key={serv.id}
                                totalAdults={formValues.adults ?? 0}
                                totalStay={calculateTotalStay(
                                    formValues.startDate ?? '',
                                    formValues.endDate ?? '',
                                )}
                                service={serv}
                                quantity={currentQty}
                                handleUpdateServices={handleUpdateServices}
                            />
                        )
                    })}
                </Box>
            </DialogContent>
            <Box
                sx={{
                    p: 3,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 2,
                }}
            >
                <Button onClick={onClose} variant="outlined">
                    Cancelar
                </Button>
                <Button onClick={handleConfirmServices} variant="contained">
                    Confirmar
                </Button>
            </Box>
        </Dialog>
    )
}
