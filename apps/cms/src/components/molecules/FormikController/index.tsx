import {
    Alert,
    AlertTitle,
    Button,
    CircularProgress,
    Stack,
    Typography,
} from '@mui/material'
import { Form, FormikErrors, useFormikContext } from 'formik'
import { PropsWithChildren } from 'react'

export const extractErrorMessages = (
    errors: FormikErrors<unknown>,
): string[] => {
    if (typeof errors === 'string') {
        return [errors]
    }
    if (Array.isArray(errors)) {
        return errors.flatMap((error) =>
            extractErrorMessages(error as FormikErrors<unknown>),
        )
    }
    if (typeof errors === 'object' && errors !== null) {
        return Object.values(errors).flatMap((error) =>
            extractErrorMessages(error as FormikErrors<unknown>),
        )
    }
    return []
}

export interface FormikControllerProps {
    onSubmit?: () => void
    onCancel?: () => void
    loadingText?: string
    submitText?: string
    cancelText?: string
}

export const FormikController: React.FC<
    PropsWithChildren<FormikControllerProps>
> = ({
    children,
    onSubmit,
    onCancel,
    submitText = 'Salvar',
    cancelText = 'Cancelar',
    loadingText = 'Carregando',
}) => {
    const { isSubmitting, errors } = useFormikContext()
    const errorMessages = extractErrorMessages(errors)
    const alertMessage =
        errorMessages.length > 2
            ? `${errorMessages.length} problemas encontrados`
            : errorMessages.join(', ')

    return (
        <Form>
            <Stack gap={6}>
                {children}
                <Stack
                    position="sticky"
                    zIndex={1000}
                    bottom={0}
                    left={0}
                    right={0}
                    pb={4}
                >
                    <Stack
                        direction="row"
                        marginBottom={2}
                        bgcolor="blueGrey.100"
                        gap={4}
                        borderRadius={1}
                        boxShadow="0 0 3px 0 rgba(0, 0, 0, .2)"
                        justifyContent={
                            errorMessages.length ? 'space-between' : 'flex-end'
                        }
                        alignItems="center"
                        p={4}
                    >
                        {errorMessages.length > 0 && (
                            <Alert
                                variant="outlined"
                                severity="error"
                                sx={{
                                    bgcolor: 'transparent',
                                    border: 'none',
                                }}
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    gap={3}
                                >
                                    <AlertTitle m={0}>
                                        Confira o formulário
                                    </AlertTitle>
                                    <Typography fontSize={12}>
                                        {alertMessage}
                                    </Typography>
                                </Stack>
                            </Alert>
                        )}
                        <Stack direction="row" gap={3}>
                            {!!onCancel && (
                                <Button
                                    disabled={isSubmitting}
                                    type="button"
                                    color="secondary"
                                    onClick={onCancel}
                                    variant="outlined"
                                    size="medium"
                                >
                                    {cancelText}
                                </Button>
                            )}
                            <Button
                                type={onSubmit ? 'button' : 'submit'}
                                color="secondary"
                                onClick={onSubmit}
                                loading={isSubmitting}
                                loadingIndicator={
                                    <>
                                        <CircularProgress />
                                        {loadingText}
                                    </>
                                }
                                size="medium"
                            >
                                {submitText}
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Form>
    )
}
