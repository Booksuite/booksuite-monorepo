'use client'

import 'moment/locale/pt-br'

import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputProps,
    InputRightElement,
    Modal,
    ModalContent,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react'
import { ptBR } from 'date-fns/locale'
import moment from 'moment'
import { useState } from 'react'
import { Calendar, DateRange } from 'react-date-range'

import CalendarIcon from '@/components/svgs/icons/CalendarIcon'

interface DateProps {
    name?: string
    defaultValue?: string
}

interface DateRangeBoxProps extends InputProps {
    inputText?: string
    label?: string
    startDateProps?: DateProps
    endDateProps?: DateProps
    asSingleDate?: boolean
    singleDateValue?: string
}

export default function DateRangeBox({
    inputText,
    label,
    startDateProps,
    endDateProps,
    asSingleDate = false,
    singleDateValue,
    ...props
}: DateRangeBoxProps) {
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
            return singleDateValue ? formatSingleDate(singleDateValue) : null
        }

        return startDateProps?.defaultValue || endDateProps?.defaultValue
            ? formatDate(startDateProps.defaultValue, endDateProps.defaultValue)
            : undefined
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
        <FormControl className="DateRangeBox">
            <input type="hidden" {...startDateProps} />
            <input type="hidden" {...endDateProps} />

            <InputGroup className="searchBox" onClick={onOpen}>
                <InputRightElement
                    className="DateRangeBox__rightElement"
                    pointerEvents="none"
                >
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
                    {asSingleDate ? (
                        <Calendar
                            className="DateRangeBox__DateRange"
                            locale={ptBR}
                            onChange={handleChangeSingle}
                            date={singleDate}
                            dateDisplayFormat="ee/MMM/yyyy"
                        />
                    ) : (
                        <DateRange
                            className="DateRangeBox__DateRange"
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
                </ModalContent>
            </Modal>
        </FormControl>
    )
}
