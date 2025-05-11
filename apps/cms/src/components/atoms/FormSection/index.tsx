import {
    CircularProgress,
    Stack,
    StackProps,
    styled,
    Typography,
} from '@mui/material'

export interface FormSectionProps extends StackProps {
    title?: string
    variant?: 'default' | 'outlined'
    isLoading?: boolean
    rightAction?: React.ReactNode
}

const FormSectionContainer = styled(Stack)<{
    variant?: FormSectionProps['variant']
}>(({ theme, variant }) => ({
    ...(variant === 'outlined' && {
        padding: theme.spacing(3),
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.blueGrey[200]}`,
    }),
}))

export const FormSection: React.FC<FormSectionProps> = ({
    children,
    title,
    variant = 'default',
    rightAction,
    isLoading,
    ...props
}) => {
    return (
        <FormSectionContainer
            component="section"
            variant={variant}
            gap={2}
            {...props}
        >
            <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" alignItems="center" gap={2}>
                    {!!title && (
                        <Typography
                            component="h4"
                            fontWeight="normal"
                            fontSize="16px"
                            color="blueGrey.700"
                        >
                            {title}
                        </Typography>
                    )}
                    {isLoading && <CircularProgress size={16} />}
                </Stack>
                {rightAction}
            </Stack>

            {children}
        </FormSectionContainer>
    )
}
