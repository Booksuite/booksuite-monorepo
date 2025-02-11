"use client";

import { Experiencia } from "@/components/shared/Experiencia";
import { Section } from "@/components/shared/Section";
import { TestimonialSection } from "@/components/shared/Sections/TestimonialSection";
import DateRangeBox from "@/components/shared/form/DateRangeBox";
import SelectBox from "@/components/shared/form/SelectBox";
import { Icons } from "@/components/svgs/icons";
import searchAcomodacoes from "@/services/acomodacoes/searchAcomodacoes";
import type { Acomodacao } from "@/types/Acomodacao";
import { Box, Button, Flex, Grid, GridItem, Image, SimpleGrid } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect } from "react";

export default function SingleAcomodacao({ params }: any) {
  const mutation: any = useMutation({
    mutationFn: (payload: any) => {
      return searchAcomodacoes({
        search: {
          slug: params.slug,
        },
      });
    },
  });

  const acomodacao: Acomodacao =
    mutation.data?.propertys?.length > 0 ? mutation.data?.propertys[0] : null;

  const list = [0, 0, 0, 0, 0, 0, 0, 0];

  const list_services = [0, 0, 0, 0, 0, 0, 0, 0];

  useEffect(() => {
    mutation.mutate({
      search: {
        slug: params.slug,
      },
    });
  }, [params]);

  if (mutation.isPending) {
    return <div></div>;
  }

  if (!acomodacao) {
    return <div></div>;
  }

  return (
    <main className="SingleAcomodacao py-8">
      <div className="container">
        <div className="imagens mb-10 relative">
          <Image borderRadius={8} src={"/images/banner.jpg"} />

          <button className="absolute bottom-4 right-16 bg-white rounded-lg px-4 py-3 flex gap-2 items-center">
            <Icons.MultiImages className="flex-shrink-0" /> Ver todas as fotos
          </button>
        </div>

        <Grid gridTemplateColumns={"1fr 1fr 1fr"} gap={10}>
          <GridItem colSpan={2}>
            <Flex justifyContent={"space-between"} gap={2} marginBottom={4}>
              <h1 className="text-2xl">{acomodacao.name}</h1>

              <button className="flex-shrink-0">
                <Icons.Share className="border rounded-full" />
              </button>
            </Flex>

            <div>{acomodacao.description}</div>

            <hr className="my-8" />

            <h2 className="text-lg">Principais comodidades</h2>

            <SimpleGrid columns={5} gap={4}>
              <Flex
                border={"1px solid"}
                borderColor={"var(--chakra-colors-chakra-border-color)"}
                borderRadius={8}
                alignItems={"center"}
                gap={2}
                flexDirection={"column"}
                padding={6}
                textAlign={"center"}
                fontSize={14}
                fontWeight={500}
              >
                <Icons.Cutlery width={"auto"} height={30} />
                Café <br /> Incluso
              </Flex>

              <Flex
                border={"1px solid"}
                borderColor={"var(--chakra-colors-chakra-border-color)"}
                borderRadius={8}
                alignItems={"center"}
                gap={2}
                flexDirection={"column"}
                padding={6}
                textAlign={"center"}
                fontSize={14}
                fontWeight={500}
              >
                <Icons.Snow width={"auto"} height={30} />
                Piscinas Aquecidas
              </Flex>

              <Flex
                border={"1px solid"}
                borderColor={"var(--chakra-colors-chakra-border-color)"}
                borderRadius={8}
                alignItems={"center"}
                gap={2}
                flexDirection={"column"}
                padding={6}
                textAlign={"center"}
                fontSize={14}
                fontWeight={500}
              >
                <Icons.Snow width={"auto"} height={30} />
                Acesso à Lagoa
              </Flex>

              <Flex
                border={"1px solid"}
                borderColor={"var(--chakra-colors-chakra-border-color)"}
                borderRadius={8}
                alignItems={"center"}
                gap={2}
                flexDirection={"column"}
                padding={6}
                textAlign={"center"}
                fontSize={14}
                fontWeight={500}
              >
                <Icons.Wifi width={"auto"} height={30} />
                Internet <br /> Wi-fi
              </Flex>

              <Flex
                border={"1px solid"}
                borderColor={"var(--chakra-colors-chakra-border-color)"}
                borderRadius={8}
                alignItems={"center"}
                gap={2}
                flexDirection={"column"}
                padding={6}
                textAlign={"center"}
                fontSize={14}
                fontWeight={500}
              >
                <Icons.Wifi width={"auto"} height={30} />
                Chalés Privativos
              </Flex>
            </SimpleGrid>

            <h2 className="text-lg mt-10">Outras comodidades</h2>

            <ul className="columns-2 [&>li]:py-1">
              <li>Churrasqueira</li>
              <li>Toalhas</li>
              <li>Área gourmet</li>
              <li>Roupão</li>
              <li>Cafeteria Dolce Gusto</li>
              <li>Roupas de cama</li>
              <li>Ducha a gás</li>
              <li>Smart TV</li>
              <li>Ar condicionado</li>
              <li>TV a cabo</li>
              <li>Lareira na suíte</li>
              <li>Wi-Fi</li>
              <li>Fogo de chão externo</li>
              <li>Rede interna</li>
              <li>Lenha</li>
              <li>Garagem privativa</li>
              <li>Balanço suspenso</li>
            </ul>

            <hr className="my-8" />

            <h2 className="text-lg">Informações de hóspedes</h2>

            <ul className="list-disc [&>li]:ms-4">
              <li>Máximo de hóspedes: {acomodacao.maxGuests}</li>
              <li>Máximo de adultos: {acomodacao.maxAdults}</li>
              <li>Máximo de crianças: {acomodacao.maxChildren}</li>
            </ul>

            <hr className="my-8" />

            <h2 className="text-lg">Tipos de cama</h2>

            <ul className="list-disc [&>li]:ms-4">
              <li>Cama casal: 1</li>
              <li>Cama de solteiro: 1</li>
              <li>Sofá cama: 1</li>
            </ul>

            <hr className="my-8" />

            <h2 className="text-lg">Regras gerais de hospedagem</h2>

            <ul className="list-disc [&>li]:ms-4">
              <li>Check-in: após 14h</li>
              <li>Check-out: até 12h</li>
            </ul>

            <Link
              href={"/politicas-e-termos-de-uso"}
              className="flex justify-between text-sm underline font-semibold py-6"
            >
              Políticas de reservas, cancelamento e cookies{" "}
              <Icons.ChevronRight className="flex-shrink-0" />
            </Link>

            <hr className="my-8" />

            <h2 className="text-lg">Calendário de disponibilidade</h2>
          </GridItem>

          <GridItem>
            <Box className="border rounded-md p-5 text-[0.9375rem]">
              <Flex gap={2} marginBottom={5}>
                <Icons.Calendar className="flex-shrink-0" />
                <h3 className="text-lg">Busque sua data</h3>
              </Flex>

              <Grid templateColumns={"1fr 1fr"} gap={3}>
                <GridItem>
                  <DateRangeBox
                    hideIcon
                    asSingleDate
                    label="Data de entrada"
                    // singleDateValue={}
                    // onChange={(value) => {
                    //   setFilter({
                    //     ...filter,
                    //     startDate: moment(value.toString()).format("DD-MM-YYYY"),
                    //   });
                    // }}
                  />
                </GridItem>

                <GridItem>
                  <DateRangeBox
                    hideIcon
                    asSingleDate
                    label="Data de saída"
                    singleDateValue={"30/06/2024"}
                    // onChange={(value) => {
                    //   setFilter({
                    //     ...filter,
                    //     endDate: moment(value.toString()).format("DD-MM-YYYY"),
                    //   });
                    // }}
                  />
                </GridItem>

                <GridItem colSpan={2}>
                  <SelectBox
                    options={[
                      { value: "Nome Lorem", label: "Nome Lorem" },
                      { value: "Lorem Ipsum", label: "Lorem Ipsum" },
                    ]}
                    defaultValue={{
                      value: "Lorem Ipsum",
                      label: "Lorem Ipsum",
                    }}
                    label="Hóspedes"
                  />
                </GridItem>
              </Grid>

              <Button marginTop={3} width={"full"} leftIcon={<Icons.Calendar />}>
                Pesquisar disponibilidade
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </div>

      <Section.Root className="bg-opacity mt-14">
        <div className="container">
          <Section.Header className="text-center">
            <Section.Title>Você também pode gostar</Section.Title>
            <Section.Subtitle>Confira nossas demais acomodações</Section.Subtitle>
          </Section.Header>

          <Grid templateColumns="repeat(auto-fill, minmax(13.125rem, 1fr))" gap={4}>
            {list.map((item, index) => (
              <GridItem
                w="100%"
                position={"relative"}
                borderRadius={8}
                aspectRatio={218 / 300}
                overflow={"hidden"}
                color={"white"}
                fontSize={12}
                key={index}
              >
                <Image
                  position={"absolute"}
                  inset={0}
                  w={"100%"}
                  h={"100%"}
                  objectFit={"cover"}
                  src="/images/banner.jpg"
                  zIndex={-1}
                />

                <Flex h="100%" direction={"column"} justifyContent={"space-between"}>
                  <div className="m-2 p-2 rounded-xl bg-white w-fit ml-auto">
                    <Icons.MultiImages className="text-black" />
                  </div>

                  <Flex
                    padding={2}
                    paddingTop={4}
                    marginTop={"auto"}
                    justifyContent={"space-between"}
                    gap={2}
                    className="bg-mask"
                  >
                    <div>
                      <h3 className="text-base mb-0">Chalé Diamante</h3>
                      <p className="">
                        À partir de <br />
                        <b>R$ 1.590,00</b> / diária
                      </p>
                    </div>

                    <Flex direction={"column"} justifyContent={"space-between"}>
                      <Flex
                        border={"1px solid white"}
                        width={"fit-content"}
                        alignItems={"center"}
                        fontSize={12}
                        gap={1}
                        marginLeft={"auto"}
                        borderRadius={4}
                        paddingInline={1}
                        marginTop={1}
                      >
                        <Icons.Person width={10} /> 2
                      </Flex>

                      <Flex direction={"row"} alignItems={"center"} fontWeight={500}>
                        Ver mais <Icons.ChevronRight className="flex-1" width={22} />
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </GridItem>
            ))}
          </Grid>
        </div>
      </Section.Root>

      <Section.Root>
        <div className="container">
          <Section.Header className="text-center">
            <Section.Title>Experiências</Section.Title>
            <Section.Subtitle>Adicione experiências em sua reserva</Section.Subtitle>
          </Section.Header>

          <SimpleGrid columns={2} spacing={4}>
            <Experiencia.Root images={["/images/banner.jpg", "/images/banner.jpg"]}>
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

            <Experiencia.Root images={["/images/banner.jpg", "/images/banner.jpg"]}>
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

            <Experiencia.Root images={["/images/banner.jpg", "/images/banner.jpg"]}>
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

            <Experiencia.Root images={["/images/banner.jpg", "/images/banner.jpg"]}>
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

      <Section.Root>
        <div className="container">
          <Section.Header className="text-center">
            <Section.Title>Serviços Extras</Section.Title>
            <Section.Subtitle>Complete sua estadia com itens adicionais</Section.Subtitle>
          </Section.Header>

          <SimpleGrid columns={4} gap={4} rowGap={6}>
            {list_services.map((item, index) => (
              <Box fontSize={15} position={"relative"} key={index}>
                <Image
                  src="/images/banner.jpg"
                  aspectRatio={1 / 1}
                  objectFit={"cover"}
                  borderRadius={8}
                  marginBottom={3}
                />

                <button className="absolute top-4 left-4 bg-white clr-orange rounded-lg p-1 w-8 aspect-square flex items-center justify-center">
                  <Icons.Fire width={24} />
                </button>

                <button className="absolute top-4 right-4 bg-white rounded-lg p-1 w-8 aspect-square flex items-center justify-center">
                  <Icons.MultiImages width={16} />
                </button>

                <h3 className="text-[0.9375rem] mb-1">Passeio de Vela</h3>

                <p>Explore as lindas paisagens a bordo do nosso veleiro.</p>

                <Grid gridTemplateColumns={"1fr 110px"}>
                  <GridItem>
                    <div>
                      <p className="text-[0.9375rem] mb-0">
                        <s>R$ 587,00</s>
                        <span className="text-white rounded-full text-xs px-1 bg-orange inline-block ml-[5px]">
                          -15%
                        </span>
                      </p>
                      <p>
                        <b className="text-lg">R$ 893,00</b>
                        <br />
                        <small>Por unidade</small>
                      </p>
                    </div>
                  </GridItem>

                  <GridItem>
                    <Flex w={"100%"} h={"100%"} alignItems={"end"} justifyContent={"end"}>
                      <Button
                        className="ml-auto font-normal"
                        marginTop={"auto"}
                        size={"sm"}
                        leftIcon={<>+</>}
                      >
                        Adicionar
                      </Button>
                    </Flex>
                  </GridItem>
                </Grid>
              </Box>
            ))}
          </SimpleGrid>
        </div>
      </Section.Root>

      <TestimonialSection />
    </main>
  );
}
