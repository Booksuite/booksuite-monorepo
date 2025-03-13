import { HousingUnitTypeFull } from '@booksuite/sdk'
import pluralize from 'pluralize'

import { formatCurrency } from '@/common/utils/currency'
import { Card } from '@/components/atoms/Card'

interface HousingUnitTypeCardProps {
    housingUnitType: HousingUnitTypeFull
}

export const HousingUnitTypeCard: React.FC<HousingUnitTypeCardProps> = ({
    housingUnitType,
}) => {
    const thumbUrl = housingUnitType.medias[0]?.media.url

    return (
        <Card.Container key={housingUnitType.id}>
            <Card.Section>
                {thumbUrl && (
                    <Card.Image src={thumbUrl} alt={housingUnitType.name} />
                )}
            </Card.Section>
            <Card.Section flex={1}>
                <Card.Title>{housingUnitType.name}</Card.Title>
                {housingUnitType.weekdaysPrice && (
                    <Card.Text hideBelow="md">
                        {formatCurrency(housingUnitType.weekdaysPrice)}
                    </Card.Text>
                )}
                {housingUnitType.weekendPrice && (
                    <Card.Text>
                        {formatCurrency(housingUnitType.weekendPrice)}
                    </Card.Text>
                )}
                <Card.Text hideBelow="md">
                    {housingUnitType.maxGuests || 1}{' '}
                    {pluralize('hóspede', housingUnitType.maxGuests || 1)}
                </Card.Text>
                <Card.Text>
                    {housingUnitType.housingUnits.length}{' '}
                    {pluralize('unidade', housingUnitType.housingUnits.length)}
                </Card.Text>
            </Card.Section>
            <Card.Section>
                <Card.OptionDots />
            </Card.Section>
        </Card.Container>
    )
}
