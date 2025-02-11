import React from "react";
import { Section } from "../Section";
import type { SectionRootProps } from "../Section/SectionRoot";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Avatar, Box, Flex } from "@chakra-ui/react";
import Star from "@/components/svgs/Star";
import { Icons } from "@/components/svgs/icons";

export function TestimonialSection(props: SectionRootProps) {
  const pagination = {
    clickable: true,
  };

  return (
    <Section.Root {...props} className={` py-[1.875rem] bg-opacity ${props.className ?? ""}`}>
      <div className="container">
        <Section.Header className="text-center">
          <Section.Title>Avaliações</Section.Title>
          <Section.Subtitle>Confira a opinião de quem já se hospedou aqui!</Section.Subtitle>
        </Section.Header>
      </div>

      <Swiper
        modules={[Pagination, Navigation]}
        slidesPerView={4}
        centeredSlides={true}
        autoHeight={true}
        navigation={{
          nextEl: ".next",
          prevEl: ".prev",
        }}
        spaceBetween={20}
        loop={true}
      >
        <SwiperSlide>
          <Box bgColor={"white"} borderWidth={1} padding={6} borderRadius={12}>
            <Flex gap={2} justifyContent={"row"} marginBottom={5}>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </Flex>

            <div className="text-[0.9375rem]">
              Simplesmente o melhor lugar para se estar. Ficamos 7 dias no chalé Refúgio e eu não
              tenho palavras. Estamos saindo renovados. Atendimento impecável, o café da manhã é o
              mais lindo e gostoso que já comi. Eles servem uma cesta de café da manhã recheada de
              AMOR! Fizemos o passeio de balão e o passeio de veleiro, e se vc tiver a oportunidade,
              FAÇA!! É tudo muito profissional e de primeira! O chalé promete tudo e entrega muito
              mais do que promete. Com certeza entrou para a lista das melhores viagens que já
              fizemos.
            </div>

            <Flex fontSize={14} gap={4} alignItems={"center"} marginTop={4}>
              <Avatar className="max-w-14" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />

              <div>
                <b>Gabi Vargas</b>

                <p className="text-xs">Fevereiro 2023 - Google</p>
              </div>
            </Flex>
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Box bgColor={"white"} borderWidth={1} padding={6} borderRadius={12}>
            <Flex gap={2} justifyContent={"row"} marginBottom={5}>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </Flex>

            <div className="text-[0.9375rem]">
              Lugar maravilhoso para ir em todas estações do ano. Fomos em período chuvoso e o clima
              do lugar, rústico e europeu deu um charme ao lugar. Em período de verão apresenta uma
              linda área externa para aproveitar. O atendimento online é extremamente cuidadoso e
              nos dá bastante privacidade. O chalé é lindo com uma decoração que dá um clima
              romântico exemplar. Já planejando para voltar. Indico a todos.
            </div>

            <Flex fontSize={14} gap={4} alignItems={"center"} marginTop={4}>
              <Avatar className="max-w-14" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />

              <div>
                <b>Juliana Faggion Lucatelli</b>

                <p className="text-xs">Novembro 2023 - Google</p>
              </div>
            </Flex>
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Box bgColor={"white"} borderWidth={1} padding={6} borderRadius={12}>
            <Flex gap={2} justifyContent={"row"} marginBottom={5}>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </Flex>

            <div className="text-[0.9375rem]">
              Melhor experiência da minha vida!! Lugar perfeito pra quem gosta de se conectar com a
              natureza mas também saber que possui recursos por perto caso precise. Lá você se sente
              em casa pois tudo funciona perfeitamente: desde a hidromassagem até a internet. Amamos
              a experiência do self-service e o pessoal que entrega o café da manhã e recolhe é
              super respeitoso com os hóspedes. Com toda certeza iremos voltar sempre que possível
              porque vale cada centavo. O lugar é surreal de perfeito e do jeitinho que amamos!!
            </div>

            <Flex fontSize={14} gap={4} alignItems={"center"} marginTop={4}>
              <Avatar className="max-w-14" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />

              <div>
                <b>Karla Costa</b>

                <p className="text-xs">Fevereiro 2023 - Google</p>
              </div>
            </Flex>
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Box bgColor={"white"} borderWidth={1} padding={6} borderRadius={12}>
            <Flex gap={2} justifyContent={"row"} marginBottom={5}>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </Flex>

            <div className="text-[0.9375rem]">
              Local excelente, com vista linda do nascer e pôr do sol, ficamos no chalé Recanto e
              tem um espaço ótimo, com banheira no quarto, banheiro com dois chuveiros, cozinha
              completa. Fomos bem atendidos em todas as solicitações e o passeio de veleiro é
              maravilhoso. O lugar é maravilhoso e com certeza pretendemos voltar.
            </div>

            <Flex fontSize={14} gap={4} alignItems={"center"} marginTop={4}>
              <Avatar className="max-w-14" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />

              <div>
                <b>Gabi Vargas</b>

                <p className="text-xs">Fevereiro 2023 - Google</p>
              </div>
            </Flex>
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Box bgColor={"white"} borderWidth={1} padding={6} borderRadius={12}>
            <Flex gap={2} justifyContent={"row"} marginBottom={5}>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </Flex>

            <div className="text-[0.9375rem]">
              Simplesmente o melhor lugar para se estar. Ficamos 7 dias no chalé Refúgio e eu não
              tenho palavras. Estamos saindo renovados. Atendimento impecável, o café da manhã é o
              mais lindo e gostoso que já comi. Eles servem uma cesta de café da manhã recheada de
              AMOR! Fizemos o passeio de balão e o passeio de veleiro, e se vc tiver a oportunidade,
              FAÇA!! É tudo muito profissional e de primeira! O chalé promete tudo e entrega muito
              mais do que promete. Com certeza entrou para a lista das melhores viagens que já
              fizemos.
            </div>

            <Flex fontSize={14} gap={4} alignItems={"center"} marginTop={4}>
              <Avatar className="max-w-14" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />

              <div>
                <b>Gabi Vargas</b>

                <p className="text-xs">Fevereiro 2023 - Google</p>
              </div>
            </Flex>
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Box bgColor={"white"} borderWidth={1} padding={6} borderRadius={12}>
            <Flex gap={2} justifyContent={"row"} marginBottom={5}>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </Flex>

            <div className="text-[0.9375rem]">
              Lugar maravilhoso para ir em todas estações do ano. Fomos em período chuvoso e o clima
              do lugar, rústico e europeu deu um charme ao lugar. Em período de verão apresenta uma
              linda área externa para aproveitar. O atendimento online é extremamente cuidadoso e
              nos dá bastante privacidade. O chalé é lindo com uma decoração que dá um clima
              romântico exemplar. Já planejando para voltar. Indico a todos.
            </div>

            <Flex fontSize={14} gap={4} alignItems={"center"} marginTop={4}>
              <Avatar className="max-w-14" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />

              <div>
                <b>Juliana Faggion Lucatelli</b>

                <p className="text-xs">Novembro 2023 - Google</p>
              </div>
            </Flex>
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Box bgColor={"white"} borderWidth={1} padding={6} borderRadius={12}>
            <Flex gap={2} justifyContent={"row"} marginBottom={5}>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </Flex>

            <div className="text-[0.9375rem]">
              Melhor experiência da minha vida!! Lugar perfeito pra quem gosta de se conectar com a
              natureza mas também saber que possui recursos por perto caso precise. Lá você se sente
              em casa pois tudo funciona perfeitamente: desde a hidromassagem até a internet. Amamos
              a experiência do self-service e o pessoal que entrega o café da manhã e recolhe é
              super respeitoso com os hóspedes. Com toda certeza iremos voltar sempre que possível
              porque vale cada centavo. O lugar é surreal de perfeito e do jeitinho que amamos!!
            </div>

            <Flex fontSize={14} gap={4} alignItems={"center"} marginTop={4}>
              <Avatar className="max-w-14" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />

              <div>
                <b>Karla Costa</b>

                <p className="text-xs">Fevereiro 2023 - Google</p>
              </div>
            </Flex>
          </Box>
        </SwiperSlide>

        <SwiperSlide>
          <Box bgColor={"white"} borderWidth={1} padding={6} borderRadius={12}>
            <Flex gap={2} justifyContent={"row"} marginBottom={5}>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </Flex>

            <div className="text-[0.9375rem]">
              Local excelente, com vista linda do nascer e pôr do sol, ficamos no chalé Recanto e
              tem um espaço ótimo, com banheira no quarto, banheiro com dois chuveiros, cozinha
              completa. Fomos bem atendidos em todas as solicitações e o passeio de veleiro é
              maravilhoso. O lugar é maravilhoso e com certeza pretendemos voltar.
            </div>

            <Flex fontSize={14} gap={4} alignItems={"center"} marginTop={4}>
              <Avatar className="max-w-14" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />

              <div>
                <b>Gabi Vargas</b>

                <p className="text-xs">Fevereiro 2023 - Google</p>
              </div>
            </Flex>
          </Box>
        </SwiperSlide>

        <Flex gap={2} justifyContent={"center"} marginTop={10}>
          <div className="prev border rounded-md p-1 cursor-pointer scale-x-[-1]">
            <Icons.ChevronRight />
          </div>
          <div className="next border rounded-md p-1 cursor-pointer">
            <Icons.ChevronRight />
          </div>
        </Flex>
      </Swiper>
    </Section.Root>
  );
}
