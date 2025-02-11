import Button from "@/components/buttons/Button";
import { Icons } from "@/components/svgs/icons";
import React, { useState, type MouseEventHandler } from "react";
import InputNumberBox from "../form/InputNumberBox";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Grid,
  GridItem,
  RadioGroup,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import InputBox from "../form/InputBox";
import SelectBox from "../form/SelectBox";
import DateRangeBox from "../form/DateRangeBox";
import { RadioItem } from "../form/RadioItem";
import moment from "moment";
import { TabButton } from "./TabButton";

export interface SmartSearchSidebarFilter {
  adults: number;
  kids: number;
  babies: number;
  package?: string;
  startDate?: string;
  endDate?: string;
}

interface SmartSearchSidebarProps {
  filter?: SmartSearchSidebarFilter;
  onSearch?: (filter: SmartSearchSidebarFilter) => void;
}

const initialFilter = {
  adults: 0,
  kids: 0,
  babies: 0,
  package: undefined,
  startDate: undefined,
  endDate: undefined,
} as SmartSearchSidebarFilter;

export default function SmartSearchSidebar(props: SmartSearchSidebarProps) {
  const [tab, setTab] = useState<"Datas" | "Experiências" | "Pacotes" | "Flexível">("Datas");
  const [filter, setFilter] = useState(props.filter ?? initialFilter);

  return (
    <>
      <h3 className="mb-4 flex items-center gap-2 text-xl">
        <Icons.Magic />
        Busca inteligente
      </h3>

      <Flex justifyContent={"space-between"} flexWrap={"wrap"} marginBottom={4}>
        <TabButton isSelected={tab === "Datas"} onClick={() => setTab("Datas")}>
          Datas
        </TabButton>
        <TabButton isSelected={tab === "Experiências"} onClick={() => setTab("Experiências")}>
          Experiências
        </TabButton>
        <TabButton isSelected={tab === "Pacotes"} onClick={() => setTab("Pacotes")}>
          Pacotes
        </TabButton>
        <TabButton isSelected={tab === "Flexível"} onClick={() => setTab("Flexível")}>
          Flexível
        </TabButton>
      </Flex>

      <Accordion allowMultiple defaultIndex={[0, 1, 2, 3]}>
        <AccordionItem border={0} p={0} className={tab === "Datas" ? "" : "hidden"}>
          <AccordionButton paddingBlock={4} paddingInline={0}>
            <Box as="span" flex="1" textAlign="left">
              <h2 className="text-[0.9375rem]">Período da viagem</h2>
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel paddingInline={0} pb={4}>
            <Grid templateColumns={"1fr 1fr"} gap={2}>
              <GridItem colSpan={2}>
                <SelectBox
                  options={[
                    {
                      value: "Todas",
                      label: "Todas",
                    },
                    { value: "Nome Lorem", label: "Nome Lorem" },
                    { value: "Lorem Ipsum", label: "Lorem Ipsum" },
                  ]}
                  defaultValue={{
                    value: "Todas",
                    label: "Todas",
                  }}
                  label="Filtrar por acomodação"
                />
              </GridItem>

              <GridItem>
                <DateRangeBox
                  hideIcon
                  asSingleDate
                  label="Data de entrada"
                  singleDateValue={filter?.startDate ?? null}
                  onChange={(value) => {
                    setFilter({
                      ...filter,
                      startDate: moment(value.toString()).format("DD-MM-YYYY"),
                    });
                  }}
                />
              </GridItem>

              <GridItem>
                <DateRangeBox
                  hideIcon
                  asSingleDate
                  label="Data de saída"
                  singleDateValue={filter?.endDate ?? null}
                  onChange={(value) => {
                    setFilter({
                      ...filter,
                      endDate: moment(value.toString()).format("DD-MM-YYYY"),
                    });
                  }}
                />
              </GridItem>
            </Grid>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border={0} p={0} className={tab === "Pacotes" ? "" : "hidden"}>
          <AccordionButton paddingBlock={4} paddingInline={0}>
            <Box as="span" flex="1" textAlign="left">
              <h2 className="text-[0.9375rem]">Selecione o pacote desejado</h2>
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel paddingInline={0} pb={4}>
            <RadioGroup
              defaultValue={filter.package ?? undefined}
              marginBottom={6}
              onChange={(e) => {
                setFilter({
                  ...filter,
                  package: e,
                });
              }}
            >
              <Stack spacing={4} direction="column">
                <RadioItem value="1" padding={3} fontSize={15}>
                  <p className="mb-0 text-[0.9375rem]">
                    <b>Dia dos Namorados</b>
                    <br />
                    12/06/2024 - 15/06/2024
                  </p>
                  <p className="m-0 text-[0.8125rem]">Mínimo de 2 diárias no período</p>
                </RadioItem>

                <RadioItem value="2" padding={3} fontSize={15}>
                  <p className="mb-0 text-[0.9375rem]">
                    <b>Dia dos Namorados</b>
                    <br />
                    12/06/2024 - 15/06/2024
                  </p>
                  <p className="m-0 text-[0.8125rem]">Mínimo de 2 diárias no período</p>
                </RadioItem>

                <RadioItem value="3" padding={3} fontSize={15}>
                  <p className="mb-0 text-[0.9375rem]">
                    <b>Dia dos Namorados</b>
                    <br />
                    12/06/2024 - 15/06/2024
                  </p>
                  <p className="m-0 text-[0.8125rem]">Mínimo de 2 diárias no período</p>
                </RadioItem>
              </Stack>
            </RadioGroup>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border={0} p={0} className={tab === "Flexível" ? "" : "hidden"}>
          <AccordionButton paddingBlock={4} paddingInline={0}>
            <Box as="span" flex="1" textAlign="left">
              <h2 className="text-[0.9375rem]">Busca Flexível</h2>
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel paddingInline={0} pb={4}>
            <p className="mb-2">Quantos dias você deseja se hospedar?</p>
            <InputNumberBox
              labelProps={{ className: "font-normal text-sm" }}
              label={"Quantidade de diárias"}
            />

            <p className="mb-2 mt-4">Qual o melhor dia para sua chegada?</p>
            <SelectBox
              options={[
                {
                  value: "Segunda-feira",
                  label: "Segunda-feira",
                },
                { value: "Nome Lorem", label: "Nome Lorem" },
                { value: "Lorem Ipsum", label: "Lorem Ipsum" },
              ]}
              defaultValue={{
                value: "Segunda-feira",
                label: "Segunda-feira",
              }}
              label="Dia de chegada"
            />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border={0} p={0}>
          <AccordionButton paddingInline={0}>
            <Box as="span" flex="1" textAlign="left">
              <h2 className="text-[0.9375rem]">Hóspedes</h2>
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel paddingInline={0} pb={4}>
            <InputNumberBox
              className="border-0 text-sm"
              variant="numberOutline"
              labelProps={{ className: "font-normal" }}
              value={filter.adults}
              label={
                <>
                  <p className="mb-1 text-sm">
                    <b className="font-medium">Adultos</b>
                  </p>
                  <span className="text-sm" style={{ color: "var(--clr-gray-dark)" }}>
                    13 anos ou mais{" "}
                  </span>
                </>
              }
              onChange={(valueAsString: string, valueAsNumber: number) => {
                setFilter({
                  ...filter,
                  adults: valueAsNumber,
                });
              }}
            />

            <hr />

            <InputNumberBox
              className="border-0"
              variant="numberOutline"
              labelProps={{ className: "font-normal text-sm" }}
              value={filter.kids}
              label={
                <>
                  <p className="mb-1 text-sm">
                    <b className="font-medium">Crianças</b>
                  </p>
                  <span className="text-sm" style={{ color: "var(--clr-gray-dark)" }}>
                    3 a 12 anos
                  </span>
                </>
              }
              onChange={(valueAsString: string, valueAsNumber: number) => {
                setFilter({
                  ...filter,
                  kids: valueAsNumber,
                });
              }}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <section></section>

      <Flex gap={2} wrap={"wrap"} justifyContent={"space-between"}>
        <button
          type="button"
          className="all-[unset] underline"
          onClick={() => {
            setFilter(initialFilter);
          }}
        >
          Limpar busca
        </button>

        <Button type="button" onClick={() => props.onSearch(filter)}>
          Pesquisar
        </Button>
      </Flex>
    </>
  );
}
