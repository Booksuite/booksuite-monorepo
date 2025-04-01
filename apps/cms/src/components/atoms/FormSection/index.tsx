import { Stack, StackProps, Typography } from '@mui/material'

export interface FormSectionProps extends StackProps {
    title?: string
}

export const FormSection: React.FC<FormSectionProps> = ({
    children,
    title,
    ...props
}) => {
    return (
        <Stack component="section" gap={2} {...props}>
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
            {children}
        </Stack>
    )
}
