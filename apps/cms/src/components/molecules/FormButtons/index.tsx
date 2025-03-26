import { Button, Stack } from '@chakra-ui/react'

export interface FormButtonsProps {
    isLoading: boolean
    onCancel?: () => void
    loadingText?: string
    submitText?: string
    cancelText?: string
}

export const FormButtons: React.FC<FormButtonsProps> = ({
    isLoading,
    onCancel,
    submitText = 'Salvar',
    cancelText = 'Cancelar',
    loadingText = 'Carregando',
}) => {
    return (
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
                        disabled={isLoading}
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
                    type="submit"
                    isLoading={isLoading}
                    loadingText={loadingText}
                    minWidth="100px"
                    size="md"
                >
                    {submitText}
                </Button>
            </Stack>
        </Stack>
    )
}
