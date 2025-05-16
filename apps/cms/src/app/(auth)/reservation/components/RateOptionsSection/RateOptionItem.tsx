import { RateOptionFull } from '@booksuite/sdk'
import { Box, Typography } from '@mui/material'

import { BILLING_TYPE_MAPPING } from '@/common/constants/billingType'
import { formatCurrency } from '@/common/utils/currency'

interface RateOptionItemProps {
    rateOption: RateOptionFull
    selected: boolean
    onClick: (option: RateOptionFull) => void
}

export const RateOptionItem: React.FC<RateOptionItemProps> = ({
    rateOption,
    selected,
    onClick,
}) => {
    return (
        <Box
            onClick={() => onClick(rateOption)}
            sx={{
                border: '1px solid',
                borderColor: selected ? 'blue.900' : 'grey.300',
                borderRadius: 1,
                px: 3,
                py: 2,
                cursor: 'pointer',
                bgcolor: selected ? 'blueGrey.50' : 'transparent',
                '&:hover': {
                    borderColor: 'blue.900',
                },
                transition: 'all 0.2s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Typography
                variant="subtitle1"
                sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: selected ? 'blue.900' : 'text.primary',
                }}
            >
                {rateOption.name}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'right',
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 600,
                            fontSize: 14,
                            color: selected ? 'blue.900' : 'text.primary',
                        }}
                    >
                        {`+${formatCurrency(rateOption.additionalAdultPrice)}`}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary' }}
                        fontWeight={400}
                        fontSize={13}
                    >
                        {BILLING_TYPE_MAPPING[rateOption.billingType]}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        border: selected ? '6px solid' : '1px solid',
                        borderColor: selected ? 'blue.900' : 'grey.400',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                />
            </Box>
        </Box>
    )
}
