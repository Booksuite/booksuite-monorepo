import { ServiceFull } from '@booksuite/sdk/src/gen/types/ServiceFull'

import { Container } from '@/components/organisms/Container'
import { ServicesCardComponent } from '@/components/templates/ServicesCard/ServicesCardComponent'
interface OtherServiceProps {
    services: ServiceFull[]
    currentServiceId: string
}

export const OtherService: React.FC<OtherServiceProps> = ({
    services,
    currentServiceId,
}) => {
    const filteredServices = services.filter(
        (service) => service.id !== currentServiceId,
    )
    if (filteredServices.length === 0) return null
    return (
        <Container>
            <div className="flex flex-col items-center text-center gap-12">
                <div className="flex flex-col items-center text-center gap-2">
                    <h2 className="text-3xl font-bold text-grey-primary">
                        Você também pode gostar
                    </h2>
                    <div className="text-grey-secondary text-lg">
                        <span>Demais extras disponíveis</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 text-start lg:grid-cols-4 gap-6">
                    {filteredServices.map((service) => (
                        <ServicesCardComponent
                            key={service.id}
                            title={service.name}
                            description={service.description}
                            images={
                                service.medias?.map(
                                    (media) => media.media.url,
                                ) ?? []
                            }
                            hasOffer={false}
                            price={service.price}
                        />
                    ))}
                </div>
            </div>
        </Container>
    )
}
