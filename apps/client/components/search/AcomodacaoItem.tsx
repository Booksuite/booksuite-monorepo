"use client";

import { Flex, Button, RadioGroup, Stack, SimpleGrid } from "@chakra-ui/react";
import React, { useState } from "react";
import { Acomodacao } from "@/components/shared/Acomodacao";
import Feature from "@/components/shared/Feature";
import { InfoBox } from "@/components/shared/InfoBox";
import { RadioItem } from "@/components/shared/form/RadioItem";
import { Icons } from "@/components/svgs/icons";
import type { Acomodacao as AcomodacaoType } from "@/types/Acomodacao";
import type { AcomodacaoRootProps } from "../shared/Acomodacao/AcomodacaoRoot";
import { useCartContext } from "@/hooks/useCartContext";

interface AcomodacaoItemProps extends Omit<AcomodacaoRootProps, "children"> {
  isOpen?: boolean;
  property: AcomodacaoType;
  onAddToCart?: (id: string | number) => void;
}

export function AcomodacaoItem({ property, onAddToCart, ...props }: AcomodacaoItemProps) {
  const [isOpen, setIsOpen] = useState(props.isOpen ?? false);
  const { addItem } = useCartContext();

  function onToggle() {
    setIsOpen(!isOpen);
  }

  function handleClickAdd() {
    addItem({
      id: property.id,
    });

    onAddToCart(property.id);
  }

  return (
    <Acomodacao.Root {...props}>
      <Acomodacao.Body
        maxCapacity={property.maxGuests}
        images={["/images/banner.jpg", "/images/banner.jpg"]}
        direction="horizontal"
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

        <Acomodacao.Actions direction={"column"} gap={4}>
          <Flex fontSize={14} fontWeight={500} direction={"row"} alignItems={"center"} gap={1}>
            <Icons.CheckRounded />
            Café da manhã
          </Flex>

          <InfoBox color="var(--clr-orange)">
            <Icons.FireRounded /> Oferta aplicada: 10% de desconto
          </InfoBox>
          <Flex justifyContent={"space-between"} alignItems={"end"}>
            <div>
              <p className="mb-0 text-sm">
                <s>R$ 5.670,00</s>
                R$ 5.103,00
              </p>

              <p className="mb-0">
                <strong>R$ 4.592,70</strong>{" "}
                <small className="clr-green text-[0.9375rem] font-medium">-10% Pix</small>
                <br />
                <span className="text-sm">
                  ou <strong>10x de 510,30</strong> sem juros
                </span>
              </p>
            </div>

            {isOpen ? (
              <Button variant={"null"} fontSize={16} onClick={onToggle}>
                Recolher
              </Button>
            ) : (
              <Button fontSize={16} onClick={onToggle}>
                Selecionar
              </Button>
            )}
          </Flex>
        </Acomodacao.Actions>
      </Acomodacao.Body>

      <Acomodacao.Below isOpen={isOpen}>
        <h2 className="font-medium text-base text-center">Selecione uma data disponível</h2>

        <Flex direction={"row"} gap={2}></Flex>

        <RadioGroup defaultValue="1" marginBottom={6}>
          <Stack spacing={4} direction="column">
            <RadioItem value="1">
              <SimpleGrid width={"100%"} columns={2} gap={2}>
                <div className=" text-[0.9375rem]">
                  <p className="mb-0 clr-primary font-medium">03/06/2024 a 05/06/2024</p>
                  <small className="mb-0 text-[0.8125rem]">
                    De segunda-feira à terça-feira (2 noites)
                  </small>
                </div>

                <div className="text-right">
                  <p className="mb-0">
                    <small>à vista no pix</small>{" "}
                    <span className="clr-green font-medium">R$ 3.402,00</span>
                  </p>
                  <p className="mb-0">
                    <small className=" text-[0.8125rem]">ou no cartão de crédito em até</small>
                    <span className="font-medium ml-1">10X R$ 378,00</span>
                  </p>
                </div>
              </SimpleGrid>
            </RadioItem>
            <RadioItem value="2">Radio 2</RadioItem>
            <RadioItem value="3">Radio 3</RadioItem>
          </Stack>
        </RadioGroup>

        <Button
          marginLeft={"auto"}
          display={"block"}
          width={"fit-content"}
          onClick={handleClickAdd}
        >
          Adicionar
        </Button>
      </Acomodacao.Below>
    </Acomodacao.Root>
  );
}
