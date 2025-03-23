import {
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'
import { Link } from 'lucide-react'
import { useState } from 'react'

import { getErrorMessage } from '@/common/utils'
import { MediaUrlInfo } from '../../types'

import { validateUrlContent } from './utils'
interface AddUrlModalProps {
    onAddUrl: (info: MediaUrlInfo) => Promise<void> | void
}

export const AddUrlModal: React.FC<AddUrlModalProps> = ({ onAddUrl }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [urlInput, setUrlInput] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isValidating, setIsValidating] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const handleAddUrl = async () => {
        try {
            setErrorMessage(null)
            setIsValidating(true)

            const info = await validateUrlContent(urlInput)
            setIsOpen(false)

            setIsSaving(true)
            await Promise.resolve(onAddUrl(info))
        } catch (error) {
            setErrorMessage(getErrorMessage(error))
        } finally {
            setIsValidating(false)
            setIsSaving(false)
        }
    }

    const handleClose = () => {
        setIsOpen(false)
        setUrlInput('')
        setErrorMessage(null)
    }

    return (
        <>
            <Button
                size="sm"
                isLoading={isSaving}
                loadingText="Adicionando"
                leftIcon={<Link />}
                variant="outline"
                onClick={() => setIsOpen(true)}
                mr={2}
            >
                Adicionar URL
            </Button>
            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Adicionar mídia externa (URL)</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl
                            isInvalid={!!errorMessage}
                            variant="none"
                            label=""
                        >
                            <Input
                                size="md"
                                value={urlInput}
                                type="url"
                                onChange={(e) => {
                                    setUrlInput(e.target.value)
                                    if (errorMessage) setErrorMessage(null)
                                }}
                                placeholder="https://"
                                isDisabled={isValidating}
                            />

                            <FormErrorMessage>{errorMessage}</FormErrorMessage>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="ghost"
                            mr={3}
                            onClick={handleClose}
                            isDisabled={isValidating}
                        >
                            Cancelar
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={handleAddUrl}
                            isLoading={isValidating}
                            loadingText="Verificando"
                            isDisabled={!urlInput.trim() || isValidating}
                        >
                            Adicionar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
