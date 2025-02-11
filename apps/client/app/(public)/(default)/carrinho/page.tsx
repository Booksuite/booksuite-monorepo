"use client";

import Button from "@/components/buttons/Button";
import CartItem from "@/components/cart/CartItem";
import ContentBox from "@/components/shared/ContentBox";
import { Icons } from "@/components/svgs/icons";
import { useCartContext } from "@/hooks/useCartContext";
import { Box, Flex, Grid, GridItem, Stack } from "@chakra-ui/react";
import React from "react";

export default function Carrinho() {
  const { cart, clearCart, addItem } = useCartContext();

  return (
    <div>
      <Flex gap={4}>
        <Button variant={"outline"} fontSize={14} marginBottom={6} onClick={clearCart}>
          Limpar carrinho
        </Button>

        <Button
          fontSize={14}
          marginBottom={6}
          onClick={() => addItem({ id: Math.floor(Math.random() * 1000) + 1 })}
        >
          Adicionar item aleatório ao carrinho
        </Button>
      </Flex>

      <Grid templateColumns="2fr 1fr" gap={6}>
        <GridItem>
          <ContentBox borderRadius={16}>
            <h1 className="text-[1.25rem] mb-6">
              Meu Carrinho{" "}
              <span className="text-[0.875rem] font-normal">
                ({cart.length} {cart.length > 1 ? "itens" : "item"})
              </span>
            </h1>

            <Stack direction={"column"} gap={8}>
              <section>
                <h2 className="text-[1.125rem] mb-5">Acomodações</h2>

                <div className="list">
                  {cart.map((cart) => (
                    <CartItem
                      key={cart.id}
                      id={cart.id}
                      title={`Chalé Imperial #${cart.id}`}
                      description="3 diárias, 27/06/24 a 30/06/24, para 4 hóspedes, café da manhã"
                      price={5670}
                      amount={cart.quantity ?? 1}
                      className="[&:not(:first-child)]:mt-4 [&:not(:first-child)]:pt-4 [&:not(:first-child)]:border-t"
                    />
                  ))}

                  <div className="[&:not(:first-child)]:mt-4 [&:not(:first-child)]:pt-4 [&:not(:first-child)]:border-t">
                    <Button
                      className="p-0 py-2 h-auto border-none text-[0.9375rem]"
                      variant={"outline"}
                    >
                      + Adicionar
                    </Button>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-[1.125rem] mb-5">Itens adicionais</h2>

                <div className="list">
                  <CartItem
                    id={0}
                    title="Experiência Romântica"
                    description="(1) Pacote Romântico, (2) massagens relaxantes"
                    price={960}
                    amount={1}
                    discount={7}
                    className="[&:not(:first-child)]:mt-4 [&:not(:first-child)]:pt-4 [&:not(:first-child)]:border-t"
                  />

                  <CartItem
                    id={0}
                    title="Passeio de Veleiro"
                    price={487}
                    amount={1}
                    className="[&:not(:first-child)]:mt-4 [&:not(:first-child)]:pt-4 [&:not(:first-child)]:border-t"
                  />

                  <div className="[&:not(:first-child)]:mt-4 [&:not(:first-child)]:pt-4 [&:not(:first-child)]:border-t">
                    <Button
                      className="p-0 py-2 h-auto border-none text-[0.9375rem]"
                      variant={"outline"}
                    >
                      + Adicionar
                    </Button>
                  </div>
                </div>
              </section>
            </Stack>
          </ContentBox>
        </GridItem>

        <GridItem>
          <ContentBox padding={0} borderRadius={16} className="text-[0.9375rem]">
            <Box padding={6}>
              <h1 className="text-[1.25rem] mb-0">Resumo da reserva</h1>
            </Box>

            <hr />

            <Box padding={6}>
              <Stack direction={"column"} gap={2} className="list">
                <Flex justifyContent={"space-between"} gap={2}>
                  <div>Acomodações</div>
                  <div className="font-semibold">R$ 5.670,00</div>
                </Flex>

                <Flex justifyContent={"space-between"} gap={2}>
                  <div>Itens adicionais</div>
                  <div className="font-semibold">R$ 1.380,00</div>
                </Flex>

                <Flex justifyContent={"space-between"} gap={2}>
                  <div>Descontos</div>
                  <div className="font-semibold">R$ -67,00</div>
                </Flex>

                <Flex justifyContent={"space-between"} gap={2} marginBlock={5}>
                  <div>Código Promocional</div>
                  <button type="button" className="clr-primary font-semibold">
                    Aplicar
                  </button>
                </Flex>

                <hr />

                <Flex justifyContent={"space-between"} gap={2} marginBlock={2} className="text-lg">
                  <div className="font-semibold">Total</div>
                  <strong>R$ 7.050,00</strong>
                </Flex>
              </Stack>

              <div className="text-right ">
                <strong className="clr-green"> R$ 6.345,00 à vista no pix (-10%)</strong> <br /> ou
                até <strong> 10x de 705,00</strong> s/ juros no cartão de crédito
              </div>

              <Button mt={6} width={"full"}>
                Ir para o pagamento <Icons.ChevronRight />
              </Button>
            </Box>
          </ContentBox>
        </GridItem>
      </Grid>
    </div>
  );
}
