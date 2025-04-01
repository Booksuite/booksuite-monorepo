import { Box, styled } from '@mui/material'

export const AspectRatioBox = styled(Box)({
    position: 'relative',
    width: '100%',
    '&::before': {
        content: '""',
        display: 'block',
        paddingTop: '100%',
    },
    '& > *': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
})
