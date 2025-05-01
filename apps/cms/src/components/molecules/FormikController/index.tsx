import { Alert, AlertTitle, Button, Stack, Typography } from '@mui/material'
import { Form, FormikErrors, useFormikContext } from 'formik'
import { PropsWithChildren, useEffect, useState } from 'react'

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
    submitText?: string
    publishedAndSubmitText?: string
    cancelText?: string
}

export const FormikController: React.FC<
    PropsWithChildren<FormikControllerProps>
> = ({
    children,
    onSubmit,
    onCancel,
    submitText = 'Salvar',
    publishedAndSubmitText = 'Salvar e Publicar',
    cancelText = 'Cancelar',
}) => {
    const [isSavingAndPublishing, setIsSavingAndPublishing] = useState(false)
    const { isSubmitting, errors } = useFormikContext()

    const errorMessages = extractErrorMessages(errors)
    const alertMessage =
        errorMessages.length > 2
            ? `${errorMessages.length} problemas encontrados`
            : errorMessages.join(', ')

    const { values, setFieldValue, handleSubmit } = useFormikContext<{
        published?: boolean
    }>()

    const handleSaveAndPublish = () => {
        setIsSavingAndPublishing(true)
        setFieldValue('published', true)
    }

    useEffect(() => {
        if (!isSavingAndPublishing && values.published !== true) return

        handleSubmit()
        setIsSavingAndPublishing(false)
    }, [handleSubmit, isSavingAndPublishing, values])

    const hasPublishedField =
        typeof values === 'object' && values !== null && 'published' in values

    const buttonsDisabled = isSavingAndPublishing || isSubmitting

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
                                    disabled={buttonsDisabled}
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
                                disabled={buttonsDisabled}
                                loading={isSubmitting && !isSavingAndPublishing}
                                color="secondary"
                                onClick={onSubmit}
                                size="medium"
                            >
                                {submitText}
                            </Button>

                            {hasPublishedField && !values.published && (
                                <Button
                                    disabled={buttonsDisabled}
                                    type={onSubmit ? 'button' : 'submit'}
                                    loading={
                                        isSubmitting && isSavingAndPublishing
                                    }
                                    color="primary"
                                    onClick={handleSaveAndPublish}
                                    size="medium"
                                >
                                    {publishedAndSubmitText}
                                </Button>
                            )}
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Form>
    )
}
