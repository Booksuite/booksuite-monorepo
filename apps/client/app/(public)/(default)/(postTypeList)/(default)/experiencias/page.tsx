import React from "react";

import { Section } from "@/components/shared/Section";

import { SimpleGrid } from "@chakra-ui/react";
import { Experiencia } from "@/components/shared/Experiencia";

interface PageExperienciasProps {}

export default function PageExperiencias({}: PageExperienciasProps) {
  return (
    <main className="PageExperiencias">
      <Section.Root>
        <div className="container-sm">
          <Section.Title className="text-center mb-8">Experiências</Section.Title>

          <SimpleGrid columns={2} spacing={4}>
            <Experiencia.Root images={["/images/banner.jpg", "/images/banner.jpg"]} columns={1}>
              <Experiencia.Body>
                <Experiencia.Title className="font-bold">
                  Experiência Um Dia Nos Canyons
                </Experiencia.Title>

                <p>Visite os Canyons do Brasil e realize diversas atividades como voar de balão.</p>

                <Experiencia.Includes
                  includes={[
                    "Café da manhã",
                    "Voo de balão",
                    "Quadriciclo",
                    "Cavalgada",
                    "Transfer",
                  ]}
                />
              </Experiencia.Body>

              <Experiencia.Footer></Experiencia.Footer>
            </Experiencia.Root>

            <Experiencia.Root images={["/images/banner.jpg", "/images/banner.jpg"]} columns={1}>
              <Experiencia.Body>
                <Experiencia.Title>Experiência Um Dia Nos Canyons</Experiencia.Title>

                <p>Visite os Canyons do Brasil e realize diversas atividades como voar de balão.</p>

                <Experiencia.Includes
                  includes={[
                    "Café da manhã",
                    "Voo de balão",
                    "Quadriciclo",
                    "Cavalgada",
                    "Transfer",
                  ]}
                />
              </Experiencia.Body>

              <Experiencia.Footer></Experiencia.Footer>
            </Experiencia.Root>

            <Experiencia.Root images={["/images/banner.jpg", "/images/banner.jpg"]} columns={1}>
              <Experiencia.Body>
                <Experiencia.Title>Experiência Um Dia Nos Canyons</Experiencia.Title>

                <p>Visite os Canyons do Brasil e realize diversas atividades como voar de balão.</p>

                <Experiencia.Includes
                  includes={[
                    "Café da manhã",
                    "Voo de balão",
                    "Quadriciclo",
                    "Cavalgada",
                    "Transfer",
                  ]}
                />
              </Experiencia.Body>

              <Experiencia.Footer></Experiencia.Footer>
            </Experiencia.Root>

            <Experiencia.Root images={["/images/banner.jpg", "/images/banner.jpg"]} columns={1}>
              <Experiencia.Body>
                <Experiencia.Title>Experiência Um Dia Nos Canyons</Experiencia.Title>

                <p>Visite os Canyons do Brasil e realize diversas atividades como voar de balão.</p>

                <Experiencia.Includes
                  includes={[
                    "Café da manhã",
                    "Voo de balão",
                    "Quadriciclo",
                    "Cavalgada",
                    "Transfer",
                  ]}
                />
              </Experiencia.Body>

              <Experiencia.Footer></Experiencia.Footer>
            </Experiencia.Root>
          </SimpleGrid>
        </div>
      </Section.Root>
    </main>
  );
}
