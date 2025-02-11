"use client";

import Feature from "@/components/shared/Feature";
import { Section } from "@/components/shared/Section";
import { TestimonialSection } from "@/components/shared/Sections/TestimonialSection";
import InputNumberBox from "@/components/shared/form/InputNumberBox";
import { Icons } from "@/components/svgs/icons";
import getAcomodacoes from "@/services/acomodacoes/getAcomodacoes";
import type { Acomodacao as AcomodacaoType } from "@/types/Acomodacao";
import { Acomodacao } from "@/components/shared/Acomodacao";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  SimpleGrid,
  Link,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function SingleExperiencia({ params }: any) {
  const { data } = useQuery({
    queryFn: getAcomodacoes,
    queryKey: ["acomodacoes"],
  });
  const properties = data?.properties;

  const list = [0, 0, 0];

  const list_services = [0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <main className="SingleExperiencia py-8">
      <div className="container">
        <Grid gridTemplateColumns={"1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"} gap={10}>
          <GridItem colSpan={7}>
            <div className="imagens mb-10 relative">
              <AspectRatio ratio={674 / 490}>
                <Image
                  w={"full"}
                  h={"full"}
                  objectFit="cover"
                  borderRadius={8}
                  src={"/images/banner.jpg"}
                />
              </AspectRatio>

              <button className="absolute top-4 right-4 bg-white rounded-lg px-3 py-2 flex gap-2 items-center text-xs">
                <Icons.MultiImages className="flex-shrink-0" /> Ver fotos
              </button>
            </div>

            <h2 className="text-lg font-medium">Sobre este item</h2>

            <div>
              <p>
                Surpreenda quem você ama e venha viver dias incríveis aqui em nossa pousada
                romântica. A Experiência Romântica é um pacote que inclui nossos serviços destaques,
                pacote romântico e massagem relaxante.
              </p>
            </div>

            <hr className="my-6" />

            <h2 className="text-lg font-medium">O que está incluso</h2>

            <SimpleGrid columns={3} gap={4}>
              <Box fontSize={13}>
                <div className="imagens mb-2 relative">
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      w={"full"}
                      h={"full"}
                      objectFit="cover"
                      borderRadius={8}
                      src={"/images/banner.jpg"}
                    />
                  </AspectRatio>

                  <button className="absolute top-2 right-2 bg-white rounded-lg p-2 flex gap-2 items-center text-xs">
                    <Icons.MultiImages className="flex-shrink-0" />
                  </button>
                </div>

                <h3 className="text-[0.9375rem] font-semibold mb-0">Pacote Romântico</h3>
                <p>1 unidade</p>
              </Box>

              <Box fontSize={13}>
                <div className="imagens mb-2 relative">
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      w={"full"}
                      h={"full"}
                      objectFit="cover"
                      borderRadius={8}
                      src={"/images/banner.jpg"}
                    />
                  </AspectRatio>

                  <button className="absolute top-2 right-2 bg-white rounded-lg p-2 flex gap-2 items-center text-xs">
                    <Icons.MultiImages className="flex-shrink-0" />
                  </button>
                </div>

                <h3 className="text-[0.9375rem] font-semibold mb-0">Massagem Relaxante</h3>
                <p>2 unidades</p>
              </Box>
            </SimpleGrid>

            <hr className="my-6" />

            <h2 className="text-lg font-medium">Informações gerais</h2>

            <ul className="list-disc  [&>li]:ms-5 [&>li]:mb-2">
              <li>
                Neste pacote, os serviços extras possuem 7% de desconto, em comparação com a
                contratação dos mesmos separadamente;
              </li>
              <li>
                O Pacote Romântico conta com uma decoração especial, frutas, chocolates e champagne.
                Este serviço é ideal para lua de mel, comemorações, pedidos de casamento, namoro e
                até mesmo para aquecer a relação;
              </li>
              <li>
                A Massagem Relaxante, é feita diretamente no seu chalé escolhido, mantendo sua total
                privacidade e conforto;
              </li>
              <li>
                Para finalizar a reserva deste item será necessário adicionar pelo menos uma
                acomodação em sua reserva
              </li>
            </ul>

            <hr className="my-6" />

            <h2 className="text-lg font-medium">Regras de aplicação</h2>

            <ul className="list-disc  [&>li]:ms-5 [&>li]:mb-2">
              <li>Estadia mínima: 2</li>
              <li>Antecedência mínima: 30 dias</li>
              <li>Noites válidas: segunda; terça; quarta; quinta, sexta, sábado, domingo.</li>
            </ul>

            <Link
              href={"/politicas-e-termos-de-uso"}
              className="flex justify-between text-sm underline font-semibold py-6"
            >
              Políticas de reservas, cancelamento e cookies{" "}
              <Icons.ChevronRight className="flex-shrink-0" />
            </Link>
          </GridItem>

          <GridItem colSpan={5}>
            <div className="sticky top-2">
              <Flex marginBottom={4}>
                <h1 className="w-full text-2xl">Experiência Romântica</h1>
                <Icons.Share className="flex-shrink-0 " />
              </Flex>

              <Flex gap={6} direction={"column"}>
                <section className="text-[0.9375rem]">
                  <p className="mb-2 font-medium">Inclui:</p>

                  <ul className="list-disc  [&>li]:ms-5">
                    <li>1 Pacote Romântico</li>
                    <li>2 Massagens Relaxantes</li>
                  </ul>
                </section>
                <section>
                  <p className="font-medium">Quantas unidades você deseja?</p>

                  <InputNumberBox label="Quantidade" defaultValue={1} />
                </section>
                <section>
                  <p className="text-[0.9375rem] mb-0">
                    <s>R$ 960,00</s>
                    <span className="clr-green font-medium rounded-full text-xs px-1 inline-block ml-[5px]">
                      -15%
                    </span>
                  </p>
                  <p className="mb-0">
                    <b className="text-lg">R$ 892,80</b>
                    <small className="ml-2">por unidade</small>
                  </p>
                  <small>
                    em até <b>10x de 89,28</b> sem juros no cartão de crédito
                  </small>
                </section>
                <Button>Adicionar ao carrinho</Button>

                <div className="text-[0.8125rem]">
                  <Icons.Alert className="inline-block mr-1 mb-1" />
                  Item adicional a reserva de uma acomodação.
                </div>
              </Flex>
            </div>
          </GridItem>
        </Grid>
      </div>

      <Section.Root className="bg-opacity mt-14">
        <div className="container">
          <Section.Header className="text-center">
            <Section.Title>Você também pode gostar</Section.Title>
            <Section.Subtitle>Confira nossas demais acomodações</Section.Subtitle>
          </Section.Header>

          <Flex justifyContent={"center"} gap={4}>
            {list.map((item, index) => (
              <GridItem
                w="13.125rem"
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
                    direction={"column"}
                    padding={2}
                    paddingTop={4}
                    marginTop={"auto"}
                    gap={2}
                    className="bg-mask"
                  >
                    <h3 className="text-base leading-5 mb-0">Chalé Diamante</h3>

                    <Flex direction={"row"}>
                      <p className="mb-0">
                        <b>
                          R$ 1.890,00 <br />
                        </b>
                        Por unidade{" "}
                      </p>

                      <Flex
                        marginTop={"auto"}
                        marginLeft={"auto"}
                        direction={"row"}
                        alignItems={"center"}
                        fontWeight={500}
                      >
                        Ver mais <Icons.ChevronRight className="flex-1" width={22} />
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </GridItem>
            ))}
          </Flex>
        </div>
      </Section.Root>

      <Section.Root>
        <div className="container">
          <Section.Header className="text-center">
            <Section.Title>Nossas Acomodações</Section.Title>
            <Section.Subtitle>Escolha uma de nossas opções</Section.Subtitle>
          </Section.Header>

          <SimpleGrid columns={3} spacing={4}>
            {properties?.map((property: AcomodacaoType) => (
              <Acomodacao.Root key={property.id}>
                <Acomodacao.Body
                  maxCapacity={property.maxGuests}
                  images={["/images/banner.jpg", "/images/banner.jpg"]}
                >
                  <Acomodacao.Title>{property.name}</Acomodacao.Title>
                  <Acomodacao.Description>{property.description}</Acomodacao.Description>
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

                  <Flex
                    className="Acomodacao__actions"
                    direction={"row"}
                    justifyContent={"space-between"}
                  >
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
                  </Flex>
                </Acomodacao.Body>
              </Acomodacao.Root>
            ))}
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
