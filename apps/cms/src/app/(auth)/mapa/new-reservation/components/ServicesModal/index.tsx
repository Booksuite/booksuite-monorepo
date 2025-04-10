import { useSearchServices } from '@booksuite/sdk'
import SearchIcon from '@mui/icons-material/Search'
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material'
import { useState } from 'react'

import { useCurrentCompanyId } from '@/common/contexts/user'
import { formatCurrency } from '@/common/utils/currency'

interface ServicesModalProps {
    open: boolean
    onClose: () => void
    onUpdateServices: (serviceId: string, quantity: number) => void
    selectedServices: { serviceId: string; qtd: number }[]
}

export const ServicesModal: React.FC<ServicesModalProps> = ({
    open,
    onClose,
    onUpdateServices,
    selectedServices,
}) => {
    const [searchQuery, setSearchQuery] = useState('')
    const companyId = useCurrentCompanyId()

    const { data: services } = useSearchServices(
        { companyId },
        {
            pagination: { page: 1, itemsPerPage: 100 },
            filter: { published: true },
        },
        undefined,
        {
            query: {
                enabled: !!companyId && open,
            },
        },
    )

    const filteredServices = services?.items.filter((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const handleQuantityChange = (serviceId: string, change: number) => {
        const currentService = selectedServices.find(
            (s) => s.serviceId === serviceId,
        )
        const currentQty = currentService?.qtd || 0
        const newQty = Math.max(0, currentQty + change)
        onUpdateServices(serviceId, newQty)
    }

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
                    InputProps={{
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
                    }}
                    sx={{ mb: 3 }}
                />
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {filteredServices?.map((service) => {
                        const currentQty =
                            selectedServices.find(
                                (s) => s.serviceId === service.id,
                            )?.qtd || 0
                        const priceLabel =
                            service.billingType === 'PER_GUEST'
                                ? 'por pessoa'
                                : service.billingType === 'DAILY'
                                  ? 'por dia'
                                  : 'un'

                        return (
                            <Box
                                key={service.id}
                                sx={{
                                    border: '1px solid',
                                    borderColor:
                                        currentQty > 0
                                            ? 'blue.900'
                                            : 'grey.200',
                                    borderRadius: 1,
                                    p: 3,
                                    bgcolor:
                                        currentQty > 0 ? '#F3F6FF' : '#FFFFFF',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Box>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: '1.125rem',
                                            fontWeight: 500,
                                            mb: 0.5,
                                        }}
                                    >
                                        {service.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'gray.300',
                                        }}
                                    >
                                        {formatCurrency(service.price)}{' '}
                                        {priceLabel}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                    }}
                                >
                                    <IconButton
                                        onClick={() =>
                                            handleQuantityChange(service.id, -1)
                                        }
                                        disabled={currentQty === 0}
                                        sx={{
                                            border: '2px solid',
                                            borderColor: 'blue.900',
                                            borderRadius: '50%',
                                            width: 32,
                                            height: 32,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: '2rem',
                                                color: 'blue.900',
                                                marginBottom: 1,
                                            }}
                                        >
                                            -
                                        </Typography>
                                    </IconButton>
                                    <Typography
                                        sx={{
                                            width: 32,
                                            textAlign: 'center',
                                            fontSize: '1.25rem',
                                        }}
                                    >
                                        {currentQty}
                                    </Typography>
                                    <IconButton
                                        onClick={() =>
                                            handleQuantityChange(service.id, 1)
                                        }
                                        sx={{
                                            border: '2px solid',
                                            borderColor: 'blue.900',
                                            borderRadius: '50%',
                                            width: 32,
                                            height: 32,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: '2rem',
                                                color: 'blue.900',
                                                marginBottom: 1,
                                            }}
                                        >
                                            +
                                        </Typography>
                                    </IconButton>
                                </Box>
                            </Box>
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
                <Button onClick={onClose} variant="contained">
                    Confirmar
                </Button>
            </Box>
        </Dialog>
    )
}
