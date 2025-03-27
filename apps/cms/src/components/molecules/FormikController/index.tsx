import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Button,
    Stack,
} from '@chakra-ui/react'
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
                        bg="gray.200"
                        gap={4}
                        borderRadius="lg"
                        boxShadow="0 0 3px 0 rgba(0, 0, 0, .2)"
                        justifyContent="flex-end"
                        alignItems="center"
                        p={4}
                    >
                        {errorMessages.length > 0 && (
                            <Alert
                                status="warning"
                                bg="transparent"
                                maxH="30px"
                            >
                                <AlertIcon />
                                <AlertTitle>Confira o formulário</AlertTitle>
                                <AlertDescription fontSize="xs">
                                    {alertMessage}
                                </AlertDescription>
                            </Alert>
                        )}
                        {!!onCancel && (
                            <Button
                                disabled={isSubmitting}
                                type="button"
                                colorScheme="gray"
                                onClick={onCancel}
                                variant="solid"
                                size="md"
                            >
                                {cancelText}
                            </Button>
                        )}
                        <Button
                            type={onSubmit ? 'button' : 'submit'}
                            onClick={onSubmit}
                            isLoading={isSubmitting}
                            loadingText={loadingText}
                            minWidth="100px"
                            size="md"
                        >
                            {submitText}
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Form>
    )
}
