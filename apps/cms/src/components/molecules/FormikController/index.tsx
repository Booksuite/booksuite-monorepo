import { Button, Stack } from '@chakra-ui/react'
import { Form, useFormikContext } from 'formik'
import { PropsWithChildren } from 'react'

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
    const { isSubmitting } = useFormikContext()

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
                        p={4}
                    >
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
