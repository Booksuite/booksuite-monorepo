"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Flex, Grid, GridItem, SimpleGrid, Stack, useDisclosure } from "@chakra-ui/react";
import type { Acomodacao as AcomodacaoType } from "@/types/Acomodacao";
import { useMutation } from "@tanstack/react-query";
import SmartSearchSidebar from "@/components/shared/SmartSearchSidebar/SmartSearchSidebar";
import useGetAllSearchParams from "@/hooks/useGetAllSearchParams";
import { SmartSearchSidebarFilter } from "@/components/shared/SmartSearchSidebar/SmartSearchSidebar";
import searchAcomodacoes from "@/services/acomodacoes/searchAcomodacoes";
import SmartSearchTag from "@/components/shared/SmartSearch/SmartSearchTag";
import { BoxHotOffer } from "./BoxHotOffer";
import { BoxSelectedPackage } from "./BoxSelectedPackage";
import moment from "moment";
import { AcomodacaoItem } from "./AcomodacaoItem";
import { AddToCartModal } from "../shared/Modals/AddToCartModal";

export default function Search() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchParams = useSearchParams();

  const mutation = useMutation({
    mutationFn: (payload: any) => {
      return searchAcomodacoes(payload);
    },
  });
  const properties = mutation?.data?.propertys;

  const router = useRouter();

  const allParams = useGetAllSearchParams();

  const filter = {
    adults: allParams.adults ? Number(allParams.adults) : 0,
    kids: allParams.kids ? Number(allParams.kids) : 0,
    babies: allParams.babies ? Number(allParams.babies) : 0,
  } as SmartSearchSidebarFilter;

  function createPayload(filter: SmartSearchSidebarFilter) {
    let payload = {
      search: {
        maxAdults: {
          gte: filter.adults,
        },
        maxChildren: {
          gte: filter.kids,
        },
      },
      options: {
        search: "equals",
        filter: "AND",
      },
      includes: "books",
    } as any;

    if (filter.startDate && filter.endDate) {
      payload = {
        ...payload,
        search: {
          ...payload.search,
          books: {
            none: {
              AND: [
                {
                  startDate: {
                    lte: moment(filter.startDate, "DD-MM-YYYY"),
                  },
                },
                {
                  endDate: {
                    gte: moment(filter.endDate, "DD-MM-YYYY"),
                  },
                },
              ],
            },
          },
        },
      };
    }

    return payload;
  }

  useEffect(() => {
    mutation.mutate(createPayload(filter));
  }, [searchParams]);

  function handleSearchClick(filter: SmartSearchSidebarFilter) {
    if (!filter) {
      return;
    }

    // gte
    // lte
    // gt
    // lt

    mutation.mutate(createPayload(filter));

    let url = "?";

    for (const [key, value] of Object.entries(filter)) {
      url += key + "=" + value + "&";
    }

    router.replace(url);
  }

  function handleAddToCart(id: number | string) {
    console.log(id);
    onOpen();
  }

  return (
    <>
      <AddToCartModal isOpen={isOpen} onClose={onClose} onClickSeeMore={onClose} />

      <Grid templateColumns="400px minmax(0, 1fr)" borderBottomWidth={1}>
        <GridItem backgroundColor={"#fff"} padding={30}>
          <SmartSearchSidebar filter={filter} onSearch={handleSearchClick} />
        </GridItem>

        <GridItem
          w={"full"}
          className="bg-opacity before:rounded-none"
          paddingBlock={30}
          paddingInline={"3.75rem"}
        >
          <h1 className="text-2xl mb-8">Selecione sua acomodação</h1>

          {allParams.startDate && allParams.endDate && (
            <section className="mb-4">
              <h5 className="text-[0.9375rem]">O período selecionado contém oferta:</h5>

              <SimpleGrid columns={2} spacing={4}>
                <BoxHotOffer />
                <BoxHotOffer />
              </SimpleGrid>
            </section>
          )}

          {allParams.package && (
            <section className="mb-4">
              <h5 className="text-[0.9375rem]">O período selecionado possui o pacote:</h5>

              <Flex direction={"column"} gap={4}>
                <BoxSelectedPackage />
              </Flex>
            </section>
          )}

          <section>
            <h5 className="text-[0.9375rem]">Resultados para sua pesquisa:</h5>

            <Stack direction={"row"} spacing={2} mb={10}>
              {(allParams.startDate || allParams.endDate) && (
                <SmartSearchTag>
                  {allParams.startDate && <>De {moment(allParams.startDate).format("DD/MM/YY")}</>}
                  {allParams.endDate && <> até {moment(allParams.endDate).format("DD/MM/YY")}</>}
                </SmartSearchTag>
              )}

              {Number(allParams.adults) > 0 && (
                <SmartSearchTag>{allParams.adults} adultos</SmartSearchTag>
              )}
              {Number(allParams.kids) > 0 && (
                <SmartSearchTag>{allParams.kids} crianças</SmartSearchTag>
              )}
            </Stack>
          </section>

          <Stack direction={"column"} spacing={8}>
            {mutation.isError && <h5 onClick={() => mutation.reset()}>{mutation.isError}</h5>}

            {properties?.map((property: AcomodacaoType) => (
              <AcomodacaoItem key={property.id} property={property} onAddToCart={handleAddToCart} />
            ))}
          </Stack>
        </GridItem>
      </Grid>
    </>
  );
}
