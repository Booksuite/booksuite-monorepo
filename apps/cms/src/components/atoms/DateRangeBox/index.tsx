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
import moment from 'moment'
import { useState } from 'react'
import Calendar from 'react-date-range/dist/components/Calendar'
import DateRange from 'react-date-range/dist/components/DateRange'

import CalendarIcon from '@/components/svgs/icons/CalendarIcon'
import { DateRangeBoxProps } from './types'

export const DateRangeBox: React.FC<DateRangeBoxProps> = ({
    inputText,
    label,
    startDateProps,
    endDateProps,
    asSingleDate = false,
    singleDateValue,
    ...props
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [inputValue, setInputValue] = useState(getInitialInputValue)
    const [dateRange, setDateRange] = useState([
        {
            startDate: startDateProps?.defaultValue ?? new Date(),
            endDate: endDateProps?.defaultValue ?? null,
            key: 'selection',
        },
    ])
    const [singleDate, setSingleDate] = useState(
        getInitialSingleDate(singleDateValue),
    )

    function getInitialSingleDate(date: string) {
        if (moment(date).isValid()) {
            return date
        }
        return null
    }

    function getInitialInputValue() {
        if (asSingleDate) {
            return singleDateValue ? formatSingleDate(singleDateValue) : ''
        }
        return startDateProps?.defaultValue || endDateProps?.defaultValue
            ? formatDate(startDateProps.defaultValue, endDateProps.defaultValue)
            : ''
    }

    function formatDate(start: string, end: string) {
        return `${moment(start).format('DD/MM/YYYY')} - ${moment(end).format('DD/MM/YYYY')}`
    }

    function formatSingleDate(date: string) {
        return `${moment(date).format('DD/MM/YYYY')}`
    }

    function handleChange(item) {
        setDateRange([item.selection])
        setInputValue(
            formatDate(item.selection.startDate, item.selection.endDate),
        )
        if (props.onChange) {
            props.onChange(item)
        }
    }

    function handleChangeSingle(item) {
        setSingleDate(item)
        setInputValue(formatSingleDate(item))
        if (props.onChange) {
            props.onChange(item)
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
                    {...props}
                />
            </InputGroup>
            <FormLabel>{label}</FormLabel>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent p={5}>
                    <Box w="100%">
                        {asSingleDate ? (
                            <Calendar
                                locale={ptBR}
                                onChange={handleChangeSingle}
                                date={singleDate}
                                dateDisplayFormat="ee/MMM/yyyy"
                            />
                        ) : (
                            <DateRange
                                locale={ptBR}
                                ranges={dateRange}
                                editableDateInputs={true}
                                moveRangeOnFirstSelection={false}
                                onChange={handleChange}
                                startDatePlaceholder="Início"
                                endDatePlaceholder="Fim"
                                dateDisplayFormat="ee/MMM/yyyy"
                            />
                        )}
                    </Box>
                </ModalContent>
            </Modal>
        </FormControl>
    )
}
