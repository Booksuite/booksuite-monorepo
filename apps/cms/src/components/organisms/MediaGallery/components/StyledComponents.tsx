import { styled } from '@mui/material/styles'

export const ModalContent = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    maxWidth: '1200px',
    height: '80vh',
    maxHeight: '80vh',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[24],
    display: 'flex',
    flexDirection: 'column',
}))

export const ModalHeader = styled('div')(({ theme }) => ({
    padding: theme.spacing(2, 3),
    borderBottom: `1px solid ${theme.palette.divider}`,
    position: 'relative',
}))

export const ModalBody = styled('div')(() => ({
    flex: 1,
    overflow: 'auto',
    padding: 0,
}))

export const ModalFooter = styled('div')(({ theme }) => ({
    padding: theme.spacing(2, 3),
    borderTop: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
}))
