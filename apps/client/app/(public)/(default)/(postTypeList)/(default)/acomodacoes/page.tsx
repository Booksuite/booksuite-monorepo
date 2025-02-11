import React from "react";

import { Section } from "@/components/shared/Section";

import Feature from "@/components/shared/Feature";
import { Flex, Stack, Link } from "@chakra-ui/react";
import { Icons } from "@/components/svgs/icons";
import { Acomodacao } from "@/components/shared/Acomodacao";
import Button from "@/components/buttons/Button";

interface PageAcomodacoesProps {}

export default function PageAcomodacoes({}: PageAcomodacoesProps) {
  return (
    <main className="PageAcomodacoes">
      <Section.Root>
        <div className="container">
          <Section.Title className="text-center mb-8">Nossas Acomodações</Section.Title>

          <Stack spacing={4} direction={"column"}>
            <Acomodacao.Root>
              <Acomodacao.Body
                maxCapacity={4}
                images={["/images/banner.jpg", "/images/banner.jpg"]}
                direction="horizontal"
              >
                <Acomodacao.Title>Chalé Imperial</Acomodacao.Title>

                <Acomodacao.Description>
                  Luxuoso e exclusivo, possui piscina aquecida com vista para a lagoa. Na suíte
                  imperial, conta com banheira de hidro, lareira e um banheiro com ducha dupla.
                  Ainda possui cozinha completa, lareira na sala, área gourmet com churrasqueira e
                  fogo de chão.
                </Acomodacao.Description>

                <Acomodacao.ListFeatures>
                  <Feature direction={"row"} gap={1}>
                    <Icons.Pool />
                    Piscina aquecida
                  </Feature>
                  <Feature direction={"row"} gap={1}>
                    <Icons.Pool />
                    Banheira
                  </Feature>
                  <Feature direction={"row"} gap={1}>
                    <Icons.Pool />
                    Lareira
                  </Feature>
                  <Feature direction={"row"} gap={1}>
                    <Icons.Pool />
                    Cozinha
                  </Feature>
                  <Feature direction={"row"} gap={1}>
                    <Icons.Pool />
                    Vista para a lagoa
                  </Feature>
                </Acomodacao.ListFeatures>

                <Acomodacao.Actions direction={"row"} justifyContent={"space-between"}>
                  <Link href={"#"} flexGrow={1}>
                    <Button className="Acomodacao__actions__button">Reservar</Button>
                  </Link>

                  <Link href={"#"} flexGrow={1}>
                    <Button
                      className="Acomodacao__actions__button Acomodacao__outlineButton"
                      variant={"outline"}
                    >
                      Ver detalhes <Icons.ChevronRight />
                    </Button>
                  </Link>
                </Acomodacao.Actions>
              </Acomodacao.Body>
            </Acomodacao.Root>

            <Acomodacao.Root>
              <Acomodacao.Body
                maxCapacity={2}
                direction="horizontal"
                images={["/images/banner.jpg"]}
              >
                <Acomodacao.Title>Chalé Imperial</Acomodacao.Title>
                <Acomodacao.Description>
                  Luxuoso e exclusivo, possui piscina aquecida com vista para a lagoa. Na suíte
                  imperial, conta com banheira de hidro, lareira e um banheiro com ducha dupla.
                  Ainda possui cozinha completa, lareira na sala, área gourmet com churrasqueira e
                  fogo de chão.
                </Acomodacao.Description>

                <Acomodacao.ListFeatures>
                  <Feature direction={"row"} gap={1}>
                    <Icons.Pool />
                    Piscina aquecida
                  </Feature>
                  <Feature direction={"row"} gap={1}>
                    <Icons.Pool />
                    Banheira
                  </Feature>
                </Acomodacao.ListFeatures>

                <Acomodacao.Actions direction={"row"} justifyContent={"space-between"}>
                  <Link href={"#"} flexGrow={1}>
                    <Button className="Acomodacao__actions__button">Reservar</Button>
                  </Link>

                  <Link href={"#"} flexGrow={1}>
                    <Button
                      className="Acomodacao__actions__button Acomodacao__outlineButton"
                      variant={"outline"}
                    >
                      Ver detalhes <Icons.ChevronRight />
                    </Button>
                  </Link>
                </Acomodacao.Actions>
              </Acomodacao.Body>
            </Acomodacao.Root>

            <Acomodacao.Root>
              <Acomodacao.Body
                maxCapacity={5}
                direction="horizontal"
                images={["/images/banner.jpg"]}
              >
                <Acomodacao.Title>Chalé Imperial</Acomodacao.Title>
                <Acomodacao.Description>
                  Luxuoso e exclusivo, possui piscina aquecida com vista para a lagoa. Na suíte
                  imperial, conta com banheira de hidro, lareira e um banheiro com ducha dupla.
                  Ainda possui cozinha completa, lareira na sala, área gourmet com churrasqueira e
                  fogo de chão.
                </Acomodacao.Description>
                <Acomodacao.ListFeatures>
                  <Feature direction={"row"} gap={1}>
                    <Icons.Pool />
                    Piscina aquecida
                  </Feature>
                  <Feature direction={"row"} gap={1}>
                    <Icons.Pool />
                    Banheira
                  </Feature>
                </Acomodacao.ListFeatures>

                <Acomodacao.Actions direction={"row"} justifyContent={"space-between"}>
                  <Link href={"#"} flexGrow={1}>
                    <Button className="Acomodacao__actions__button">Reservar</Button>
                  </Link>

                  <Link href={"#"} flexGrow={1}>
                    <Button
                      className="Acomodacao__actions__button Acomodacao__outlineButton"
                      variant={"outline"}
                    >
                      Ver detalhes <Icons.ChevronRight />
                    </Button>
                  </Link>
                </Acomodacao.Actions>
              </Acomodacao.Body>
            </Acomodacao.Root>
          </Stack>
        </div>
      </Section.Root>
    </main>
  );
}
