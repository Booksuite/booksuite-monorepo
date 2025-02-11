import Button from "@/components/buttons/Button";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

export function DataContent() {
  return (
    <Box bg={"white"} className="border rounded-lg p-6 mb-6">
      <h4 className="mb-6 text-center text-[1.125rem]">Selecione a data de entrada e saída</h4>

      <Flex direction={"row"} justifyContent={"space-between"} gap={2}>
        <button className="underline">Limpar busca</button>
        <Button className="min-w-52">Pesquisar</Button>
      </Flex>
    </Box>
  );
}
