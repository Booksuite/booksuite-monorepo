import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

import {
    addMonths,
    dayjs,
    eachDayOfInterval,
    endOfMonth,
    formatDate,
    isSameMonth,
    startOfMonth,
    subMonths,
} from '@/common/utils/dayjs'
import { InputSelect } from '@/components/atoms/InputSelect'

interface Price {
    value: number
    available: number
    isUnavailable?: boolean
    isSpecialPrice?: boolean
    minDays?: number
}

interface HousingUnitTypeOption {
    id: string
    name: string
    prices: Record<string, Price>
    minDays: number
}

interface AvailabilityCalendarProps {
    housingUnitTypes: HousingUnitTypeOption[]
    currentHousingUnitId: string
    onDateSelect?: (date: Date) => void
    onHousingUnitTypeChange?: (housingUnitTypeId: string) => void
}

export function AvailabilityCalendar({
    housingUnitTypes,
    currentHousingUnitId,
    onDateSelect,
    onHousingUnitTypeChange,
}: AvailabilityCalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [nextMonthDate, setNextMonthDate] = useState(addMonths(new Date(), 1))
    const [selectedHousingUnitTypeId, setSelectedHousingUnitTypeId] =
        useState<string>(currentHousingUnitId)

    const selectedHousingUnitType = housingUnitTypes.find(
        (type) => type.id === selectedHousingUnitTypeId,
    )

    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

    const handlePreviousMonth = () => {
        const previousMonth = subMonths(currentDate, 1)
        const now = new Date()
        const currentMonth = startOfMonth(now)

        if (!dayjs(previousMonth).isBefore(currentMonth, 'month')) {
            setCurrentDate(previousMonth)
            setNextMonthDate(subMonths(nextMonthDate, 1))
        }
    }

    const handleNextMonth = () => {
        setCurrentDate((prev) => addMonths(prev, 1))
        setNextMonthDate((prev) => addMonths(prev, 1))
    }

    const handleHousingUnitTypeChange = (value: string) => {
        setSelectedHousingUnitTypeId(value)
        onHousingUnitTypeChange?.(value)
    }

    const getDaysInMonth = (date: Date) => {
        const start = startOfMonth(date)
        const end = endOfMonth(date)
        return eachDayOfInterval({ start, end })
    }

    const renderCalendarDays = (date: Date) => {
        const days = getDaysInMonth(date)
        const firstDayOfMonth = startOfMonth(date)
        const emptyDays = new Date(firstDayOfMonth).getDay()

        return (
            <div className="grid grid-cols-7 gap-2 justify-items-center">
                {[...Array(emptyDays)].map((_, index) => (
                    <div
                        key={`empty-${index}`}
                        className="h-[60px] w-[120px]"
                    />
                ))}
                {days.map((day) => {
                    const dateKey = formatDate(day, 'YYYY-MM-DD')
                    const price = selectedHousingUnitType?.prices[dateKey]
                    const isCurrentMonth = isSameMonth(day, date)

                    if (!isCurrentMonth) {
                        return (
                            <div key={dateKey} className="h-[60px] w-[120px]" />
                        )
                    }

                    const isUnavailable = price?.isUnavailable || !price

                    return (
                        <div
                            key={dateKey}
                            className={`h-[60px] w-[120px] p-1.5 rounded-lg ${
                                isUnavailable
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'cursor-pointer hover:border-systemColors-green'
                            } `}
                            onClick={() =>
                                !isUnavailable && onDateSelect?.(day)
                            }
                        >
                            <div className="flex flex-col gap-0 items-center">
                                {!isUnavailable &&
                                    selectedHousingUnitType?.minDays > 1 && (
                                        <span className="bg-grey-800 text-white text-[12px] px-1 leading-4 rounded">
                                            {selectedHousingUnitType.minDays}
                                        </span>
                                    )}
                                <span
                                    className={`text-md mt-0.5 ${
                                        isUnavailable
                                            ? 'line-through text-grey-secondary'
                                            : ''
                                    }`}
                                >
                                    {formatDate(day, 'D')}
                                </span>
                            </div>
                            {price && !isUnavailable && (
                                <div
                                    className={`mt-0.5 text-sm text-center ${
                                        price.isSpecialPrice
                                            ? 'text-systemColors-green font-medium'
                                            : 'text-grey-primary'
                                    }`}
                                >
                                    {price.value.toLocaleString('pt-BR')}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        )
    }

    const canGoPrevious = !dayjs(currentDate).isSame(
        startOfMonth(new Date()),
        'month',
    )

    return (
        <div className="w-full max-w-[1800px] mx-auto">
            <div className="flex justify-between items-center mb-4 px-4">
                <h2 className="text-xl font-semibold">
                    Calendário de disponibilidade
                </h2>
                <div className="relative w-[175px]">
                    <InputSelect
                        value={selectedHousingUnitTypeId}
                        options={housingUnitTypes.map((type) => ({
                            value: type.id,
                            label: type.name,
                        }))}
                        onChange={handleHousingUnitTypeChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-0">
                <div className="px-4">
                    <div className="flex justify-between items-center mb-4">
                        <button
                            onClick={handlePreviousMonth}
                            className={`p-2 rounded-full ${
                                canGoPrevious
                                    ? 'hover:bg-grey-100 text-grey-primary'
                                    : 'opacity-50 cursor-not-allowed text-grey-secondary'
                            }`}
                            disabled={!canGoPrevious}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h3 className="text-lg font-medium capitalize">
                            {formatDate(currentDate, 'MMMM YYYY')}
                        </h3>
                        <div className="w-9" />
                    </div>
                    <div className="grid grid-cols-7 gap-2 mb-2 justify-items-center">
                        {weekDays.map((day) => (
                            <div
                                key={day}
                                className="text-center text-sm font-medium text-grey-primary w-[120px]"
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                    {renderCalendarDays(currentDate)}
                </div>

                <div className="px-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="w-9" />
                        <h3 className="text-lg font-medium capitalize">
                            {formatDate(nextMonthDate, 'MMMM YYYY')}
                        </h3>
                        <button
                            onClick={handleNextMonth}
                            className="p-2 hover:bg-grey-100 rounded-full"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 mb-2 justify-items-center">
                        {weekDays.map((day) => (
                            <div
                                key={day}
                                className="text-center text-sm font-medium text-grey-primary w-[120px]"
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                    {renderCalendarDays(nextMonthDate)}
                </div>
            </div>
        </div>
    )
}
