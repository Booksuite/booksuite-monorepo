'use client'

import 'moment/locale/pt-br'
import 'react-datepicker/dist/react-datepicker.css'

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
import moment from 'moment'
import { useState } from 'react'
import DatePicker from 'react-datepicker'

import CalendarIcon from '@/components/svgs/icons/CalendarIcon'

import { DateRangeBoxProps } from './types'

export const DateRangeBox: React.FC<DateRangeBoxProps> = ({
    label,
    startDateProps,
    endDateProps,
    asSingleDate = false,
    singleDateValue,
    ...props
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [inputValue, setInputValue] = useState(getInitialInputValue)
    const [startDate, setStartDate] = useState(
        startDateProps?.defaultValue ?? new Date(),
    )
    const [endDate, setEndDate] = useState(endDateProps?.defaultValue ?? null)
    const [singleDate, setSingleDate] = useState(
        getInitialSingleDate(singleDateValue ?? ''),
    )

    function getInitialSingleDate(date: string) {
        if (moment(date).isValid()) {
            return new Date(date)
        }
        return null
    }

    function getInitialInputValue() {
        if (asSingleDate) {
            return singleDateValue
                ? formatSingleDate(new Date(singleDateValue))
                : ''
        }
        return startDateProps?.defaultValue || endDateProps?.defaultValue
            ? formatDate(
                  new Date(startDateProps?.defaultValue ?? ''),
                  new Date(endDateProps?.defaultValue ?? ''),
              )
            : ''
    }

    function formatDate(start: Date, end: Date) {
        return `${moment(start).format('DD/MM/YYYY')} - ${moment(end).format('DD/MM/YYYY')}`
    }

    function formatSingleDate(date: Date) {
        return `${moment(date).format('DD/MM/YYYY')}`
    }

    function handleChange(dates: [Date | null, Date | null]) {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
        if (start && end) {
            setInputValue(formatDate(start, end))
        } else {
            setInputValue('')
        }
        if (props.onChange) {
            props.onChange({ startDate: start, endDate: end })
        }
    }

    function handleChangeSingle(date: Date | null) {
        setSingleDate(date)
        setInputValue(date ? formatSingleDate(date) : '')
        if (props.onChange) {
            props.onChange(date)
        }
    }

    return (
        <FormControl>
            <input type="hidden" {...startDateProps} />
            <input type="hidden" {...endDateProps} />

            <InputGroup onClick={onOpen} cursor="pointer">
                <InputRightElement top="50%" transform="translateY(-50%)">
                    <CalendarIcon />
                </InputRightElement>
                <Input
                    type="text"
                    placeholder=" "
                    readOnly
                    value={inputValue}
                />
            </InputGroup>
            <FormLabel>{label}</FormLabel>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent p={5}>
                    <Box w="100%">
                        {asSingleDate ? (
                            <DatePicker
                                selected={singleDate}
                                onChange={handleChangeSingle}
                                locale={ptBR}
                                dateFormat="dd/MM/yyyy"
                            />
                        ) : (
                            <DatePicker
                                selected={startDate}
                                onChange={handleChange}
                                startDate={startDate}
                                endDate={endDate}
                                selectsRange
                                locale={ptBR}
                                dateFormat="dd/MM/yyyy"
                            />
                        )}
                    </Box>
                </ModalContent>
            </Modal>
        </FormControl>
    )
}
