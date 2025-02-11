import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { ModalProps } from "@chakra-ui/react";
import { Icons } from "@/components/svgs/icons";

import React, { useState } from "react";
import StepMotivo from "./StepMotivo";
import StepEscolha from "./StepEscolha";
import { TabButton } from "./TabButton";
import InputNumberBox from "../form/InputNumberBox";
import InputBox from "../form/InputBox";
import { DataContent } from "./Tabs/DataContent";
import { ExperienciasContent } from "./Tabs/ExperienciasContent";
import { PacotesContent } from "./Tabs/PacotesContent";

export interface SmartSearchModalProps extends Omit<ModalProps, "children"> {
  initialStep?: "escolha" | "motivo" | "final";
  selectedTab?: "datas" | "experiencias" | "pacotes" | "flexivel";
}

export function SmartSearchModal({
  initialStep = "motivo",
  selectedTab = "datas",
  ...props
}: SmartSearchModalProps) {
  const [step, setStep] = useState<SmartSearchModalProps["initialStep"]>(initialStep);
  const [tab, setTab] = useState<SmartSearchModalProps["selectedTab"]>(selectedTab);

  return (
    <Modal size={"full"} {...props}>
      <ModalOverlay />
      <ModalContent>
        {step !== "final" && (
          <>
            <ModalHeader className="bg-primary text-white">
              <h3 className="text-center mb-0 flex items-center gap-2 justify-center">
                <Icons.Magic />
                Busca inteligente
              </h3>

              <ModalCloseButton className="top-[15px] right-[15px] " />
            </ModalHeader>
            <ModalBody className="bg-opacity pt-9">
              <div className="mx-auto max-w-[670px]">
                {step === "motivo" && (
                  <StepMotivo
                    onSkipStepClick={() => setStep("escolha")}
                    onNextStepClick={() => setStep("escolha")}
                  />
                )}

                {step === "escolha" && (
                  <StepEscolha
                    onNextStepClick={(value: SmartSearchModalProps["selectedTab"]) => {
                      setTab(value);
                      setStep("final");
                    }}
                  />
                )}
              </div>
            </ModalBody>
          </>
        )}

        {step === "final" && (
          <>
            <ModalHeader className="bg-primary text-white pb-0">
              <div className="container">
                <div className="flex items-end gap-6">
                  <h3 className="text-center text-[1.25rem] flex items-center gap-2 justify-center mb-2">
                    <Icons.Magic />
                    Busca inteligente:
                  </h3>

                  <div className="text-[1rem]">
                    <TabButton onClick={() => setTab("datas")} active={tab === "datas"}>
                      Datas
                    </TabButton>
                    <TabButton
                      onClick={() => setTab("experiencias")}
                      active={tab === "experiencias"}
                    >
                      Experiências
                    </TabButton>
                    <TabButton onClick={() => setTab("pacotes")} active={tab === "pacotes"}>
                      Pacotes
                    </TabButton>
                    <TabButton onClick={() => setTab("flexivel")} active={tab === "flexivel"}>
                      Flexível
                    </TabButton>
                  </div>
                </div>
              </div>

              <ModalCloseButton className="top-[11px] right-[15px] " />
            </ModalHeader>
            <ModalBody className="bg-opacity pt-9">
              <div className="container">
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  <GridItem colSpan={1}>
                    <Box bg={"white"} className="border rounded-lg p-6 mb-6">
                      <h4 className="mb-6 text-center text-[1.125rem]">Quantidade de hóspedes</h4>

                      <InputNumberBox
                        className="border-0"
                        variant="numberOutline"
                        labelProps={{ className: "font-normal" }}
                        label={
                          <>
                            <p className="mb-1">
                              <b className="font-medium">Adultos</b>
                            </p>
                            <span style={{ color: "var(--clr-gray-dark)" }}>13 anos ou mais </span>
                          </>
                        }
                      />

                      <hr className="my-2" />

                      <InputNumberBox
                        className="border-0"
                        variant="numberOutline"
                        labelProps={{ className: "font-normal" }}
                        label={
                          <>
                            <p className="mb-1">
                              <b className="font-medium mb-2">Crianças</b>
                            </p>
                            <span style={{ color: "var(--clr-gray-dark)" }}>3 a 12 anos </span>
                          </>
                        }
                      />

                      <hr className="my-2" />

                      <InputNumberBox
                        className="border-0"
                        variant="numberOutline"
                        labelProps={{ className: "font-normal" }}
                        label={
                          <>
                            <p className="mb-1">
                              <b className="font-medium">Bebês</b>
                            </p>
                            <span style={{ color: "var(--clr-gray-dark)" }}>0 a 2 anos </span>
                          </>
                        }
                      />
                    </Box>

                    <InputBox label="Código promocional" />
                  </GridItem>

                  <GridItem colSpan={2}>
                    {tab === "datas" && <DataContent />}
                    {tab === "experiencias" && <ExperienciasContent />}
                    {tab === "pacotes" && <PacotesContent />}
                    {tab === "flexivel" && <DataContent />}
                  </GridItem>
                </Grid>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
