import { HousingUnitType } from '@booksuite/sdk'
import { HousingUnit } from '@booksuite/sdk/src/gen/types/HousingUnit'
import { Box, Typography } from '@mui/material'

import { formatCurrency } from '@/common/utils/currency'

interface HousingUnitItemProps {
    housingUnitType: HousingUnitType
    housingUnit: HousingUnit
    selected: boolean
    disabled: boolean
    onClick: (id: string) => void
}

export const HousingUnitItem = ({
    housingUnitType,
    housingUnit,
    selected,
    disabled,
    onClick,
}: HousingUnitItemProps) => {
    return (
        <Box
            onClick={() => onClick(housingUnit.id)}
            sx={() => {
                return {
                    border: '1px solid',
                    borderColor: selected
                        ? 'blue.900'
                        : disabled
                          ? '#D1D5DB'
                          : '#E5E7EB',
                    borderRadius: 1,
                    p: 3,
                    mb: 2,
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    bgcolor: disabled
                        ? '#F3F4F6'
                        : selected
                          ? '#F3F6FF'
                          : '#FFFFFF',
                    color: disabled ? '#6B7280' : 'inherit',
                    opacity: disabled ? 0.9 : 1,
                    '&:hover': {
                        borderColor: disabled ? '#D1D5DB' : 'blue.900',
                        bgcolor: disabled ? '#F3F4F6' : '#F3F6FF',
                    },
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease-in-out',
                    pointerEvents: disabled ? 'none' : 'auto',
                }
            }}
        >
            <Box>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '1rem',
                        fontWeight: 400,
                        color: disabled ? '#6B7280' : '#1F2937',
                    }}
                >
                    {housingUnit.name}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: '0.875rem',
                        color: disabled ? '#FCA5A5' : '#6B7280',
                    }}
                >
                    {`${
                        disabled
                            ? 'Adultos ' +
                              housingUnitType.maxAdults +
                              ' Crianças ' +
                              housingUnitType.maxChildren
                            : 'Máx. Hóspedes ' + housingUnitType.maxGuests
                    }`}
                </Typography>
            </Box>

            <Box sx={{ textAlign: 'right' }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: disabled ? '#6B7280' : '#1F2937',
                        mb: 0.5,
                    }}
                >
                    {formatCurrency(housingUnitType.weekdaysPrice || 0)}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: disabled ? '#6B7280' : '#1F2937',
                        fontSize: '0.875rem',
                    }}
                >
                    por diária
                </Typography>
            </Box>
        </Box>
    )
}
