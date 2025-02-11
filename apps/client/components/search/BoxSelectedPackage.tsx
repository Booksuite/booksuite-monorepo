import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Button from "../buttons/Button";
import { Icons } from "../svgs/icons";

export function BoxSelectedPackage() {
  return (
    <Box
      className="flex flex-col gap-2 text-[0.8125rem]"
      borderWidth={1}
      borderColor={"var(--clr-primary)"}
      padding={4}
      borderRadius={12}
      fontSize={14}
    >
      <Flex justifyContent={"space-between"} alignItems={"start"} gap={2}>
        <h2 className="clr-primary text-base font-semibold mb-0">Pacote de Réveillon</h2>

        <Button variant={"naked"} padding={0} height={"auto"} fontSize={14}>
          Ver detalhes <Icons.Modal width={20} height={"auto"} className="ml-2" />
        </Button>
      </Flex>

      <p className="mb-0 flex items-center gap-2">
        <Icons.Calendar width={20} height={"auto"} className="inline-block" /> 27/12/2024 -
        02/01/2025 - Mínimo de 3 diárias no período
      </p>
      <p className="mb-0">
        <b>Inclui:</b> Café da manhã, Noite de Réveillon com Ceia, Espumante
      </p>
    </Box>
  );
}
