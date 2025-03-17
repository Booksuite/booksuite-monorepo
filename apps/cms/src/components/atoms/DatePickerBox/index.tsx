'use client'

import 'moment/locale/pt-br'

import {
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalContent,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react'
import { ptBR } from 'date-fns/locale'
import { CalendarDays } from 'lucide-react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'

import { DatePickerProps } from './types'

export const DatePickerBox: React.FC<DatePickerProps> = ({
    label,
    value,
    onChange,
    formControl,
    error,
    ...props
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedDate, setSelectedDate] = useState<Date | null>(
        value ? new Date(value) : null,
    )

    useEffect(() => {
        if (value) {
            setSelectedDate(new Date(value))
        }
    }, [value])

    function handleDateChange(date) {
        if (!date) return
        setSelectedDate(date)
        onChange?.(date)
        onClose()
    }

    return (
        <FormControl {...formControl} isInvalid={!!error}>
            <FormLabel>{label}</FormLabel>
            <InputGroup onClick={onOpen} cursor="pointer">
                <InputRightElement top="50%" transform="translateY(-50%)">
                    <CalendarDays />
                </InputRightElement>
                <Input
                    type="text"
                    value={
                        selectedDate
                            ? moment(selectedDate).format('DD/MM/YYYY')
                            : ''
                    }
                    readOnly
                    {...props}
                />
            </InputGroup>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent p={5}>
                    <Box w="100%">
                        <DayPicker
                            locale={ptBR}
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateChange}
                        />
                    </Box>
                </ModalContent>
            </Modal>
        </FormControl>
    )
}
