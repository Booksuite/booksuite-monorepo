"use client";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Button from "@/components/buttons/Button";
import { Experiencia } from "@/components/shared/Experiencia";
import Feature from "@/components/shared/Feature";
import { Section } from "@/components/shared/Section";
import { SectionPaymentMethods } from "@/components/shared/Sections/PaymentMethods";
import { Icons } from "@/components/svgs/icons";
import { Flex, Image, SimpleGrid, Stack, useDisclosure, Link } from "@chakra-ui/react";
import { SmartSearchBar } from "@/components/shared/SmartSearchBar";
import { SmartSeachSection } from "@/components/shared/Sections/SmartSeachSection";
import { FAQSection } from "@/components/shared/Sections/FAQSection";
import { PromoSection } from "@/components/shared/Sections/PromoSection";
import { ReserveSection } from "@/components/shared/Sections/ReserveSection";

import { useQuery } from "@tanstack/react-query";
import getAcomodacoes from "@/services/acomodacoes/getAcomodacoes";
import { Acomodacao } from "@/components/shared/Acomodacao";
import type { Acomodacao as AcomodacaoType } from "@/types/Acomodacao";

export default function Home() {
  const { data } = useQuery({
    queryFn: getAcomodacoes,
    queryKey: ["acomodacoes"],
  });
  const properties = data?.properties;

  const pagination = {
    clickable: true,
  };

  const sobrePagination = {
    clickable: true,
  };

  return (
    <div className="PageHome">
      <div className="banner">
        <Swiper modules={[Pagination]} slidesPerView={1} pagination={pagination}>
          <SwiperSlide>
            <div className="banner__slide">
              <Image className="banner__image" src={"/images/banner.jpg"} />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="banner__slide">
              <Image className="banner__image" src={"/images/banner.jpg"} />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="banner__slide">
              <Image className="banner__image" src={"/images/banner.jpg"} />
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="banner__container">
          <div className="banner__content">
            <h1 className="banner__title">
              Privacidade, luxo e conforto <br /> em meio à natureza
            </h1>
            <h2 className="banner__subtitle">Hospede-se e viva esta experiência!</h2>
          </div>

          <SmartSearchBar />
        </div>
      </div>
      <Section.Root className="main">
        <div className="container">
          <Section.Header className="text-center">
            <Section.Title>Chalé Lagoa da Serra</Section.Title>
            <Section.Subtitle className="main__subtitle">
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.8125 16.25C8.8125 16.25 13.875 11.4522 13.875 7.8125C13.875 5.01656 11.6084 2.75 8.8125 2.75C6.01656 2.75 3.75 5.01656 3.75 7.8125C3.75 11.4522 8.8125 16.25 8.8125 16.25ZM8.8125 10.3438C7.41453 10.3438 6.28125 9.21047 6.28125 7.8125C6.28125 6.41453 7.41453 5.28125 8.8125 5.28125C10.2105 5.28125 11.3438 6.41453 11.3438 7.8125C11.3438 9.21047 10.2105 10.3438 8.8125 10.3438Z"
                  fill="currentColor"
                />
              </svg>
              Araranguá, Santa Catarina - Brasil
            </Section.Subtitle>
          </Section.Header>

          <SimpleGrid alignItems={"center"} columns={2} spacing={20}>
            <div>
              <h1>Sobre nós</h1>

              <div>
                <p>
                  O Chalé Lagoa da Serra, localizado em Araranguá-SC, é ideal para casais que buscam
                  relaxar em meio à natureza. São mais de 30 mil metros quadrados de área verde e
                  acesso privativo à lagoa, proporcionando uma verdadeira imersão a natureza.
                </p>

                <p>
                  Nossos românticos chalés são em diferentes estilos, como cabanas, rústicos e casa
                  na árvore, buscando criar a combinação perfeita entre a natureza e a arquitetura.
                  Contam com comodidades como banheira com hidro, cozinha completa e churrasqueira.
                  Cesta de café da manhã inclusa na diária.
                </p>
              </div>

              <Stack className="my-8" direction={"row"} spacing={10}>
                <Feature icon={<Icons.Gift />}>
                  Café <br /> Incluso
                </Feature>
                <Feature icon={<Icons.Gift />}>
                  Piscinas <br /> Aquecidas
                </Feature>

                <Feature icon={<Icons.Gift />}>
                  Acesso à <br />
                  Lagoa
                </Feature>

                <Feature icon={<Icons.Gift />}>
                  Internet <br />
                  Wi-fi
                </Feature>

                <Feature icon={<Icons.Gift />}>
                  Chalés <br />
                  Privativos
                </Feature>
              </Stack>

              <Link href={"/"}>
                <Button
                  className="main__button"
                  variant="outline"
                  rightIcon={<Icons.ChevronRight />}
                >
                  Sobre nós
                </Button>
              </Link>
            </div>

            <div>
              <Swiper
                modules={[Pagination, Navigation]}
                slidesPerView={1}
                pagination={pagination}
                navigation={true}
                className="rounded-3xl overflow-hidden"
              >
                <SwiperSlide>
                  <div className="relative aspect-square">
                    <Image
                      className="absolute inset-0 w-full h-full object-cover"
                      src="/images/balao.png"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="relative aspect-square">
                    <Image
                      className="absolute inset-0 w-full h-full object-cover"
                      src="/images/banner.jpg"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </SimpleGrid>
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
      <SectionPaymentMethods />
      <Section.Root>
        <div className="container">
          <Section.Header className="text-center">
            <Section.Title>Experiências</Section.Title>
            <Section.Subtitle>Adicione experiências em sua reserva</Section.Subtitle>
          </Section.Header>

          <SimpleGrid columns={2} spacing={4}>
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
      <Section.Root className="bg-opacity">
        <PromoSection />
        <ReserveSection />
        <FAQSection />
        <SmartSeachSection />
      </Section.Root>
    </div>
  );
}
