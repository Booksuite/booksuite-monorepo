"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import InputBox from "@/components/shared/form/InputBox";
import { Stack, Flex, Button, Alert, AlertDescription } from "@chakra-ui/react";
import React from "react";
import { Icons } from "@/components/svgs/icons";
import SelectBox from "@/components/shared/form/SelectBox";
import { TextAreaBox } from "@/components/shared/form/TextAreaBox";

export default function PoliticaDePrivacidade() {
  function handleSubmit() {
    console.log("oi");
  }

  return (
    <div className="PoliticaDePrivacidade">
      <PageHeader.Root>
        <PageHeader.BackLink href="/configuracoes">Configurações</PageHeader.BackLink>

        <PageHeader.Title>Política de Privacidade</PageHeader.Title>
      </PageHeader.Root>

      <form onSubmit={handleSubmit}>
        <Stack gap={8}>
          <Flex direction="column" gap={2}>
            <TextAreaBox label="Descrição da Política" />
          </Flex>

          <Button type="submit">Salvar</Button>
        </Stack>
      </form>
    </div>
  );
}
