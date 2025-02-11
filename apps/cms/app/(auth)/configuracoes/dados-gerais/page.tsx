"use client";

import { useCompanyContext } from "@/app/providers/companyProvider";
import { PageHeader } from "@/components/shared/PageHeader";
import InputBox from "@/components/shared/form/InputBox";
import InputCheckboxBox from "@/components/shared/form/InputCheckboxBox";
import SelectBox from "@/components/shared/form/SelectBox";
import { toastGenericPatchMessages } from "@/contexts/constants/toastMessages";
import type { UpdateCompanyDTO } from "@/types/Company";
import { slugify } from "@/utils/slugify";
import { Stack, Flex, CheckboxGroup, Button, useToast } from "@chakra-ui/react";
import React, { useState, type FormEvent } from "react";
import { updateCompany } from "@/services/company/updateCompany";

export default function DadosGerais() {
  const [formData, setFormData] = useState<UpdateCompanyDTO>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { company, setCompany } = useCompanyContext();

  const toast = useToast();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSaving || !formData) {
      return;
    }

    setIsSaving(true);

    const response = new Promise((resolve, reject) => {
      resolve(updateCompany(company.id, formData));
    })
      .then((resp: any) => {
        if (resp.success) {
          if (resp.company) {
            setCompany(resp.company);
          }
        }
      })
      .finally(() => {
        setIsSaving(false);
      });

    toast.promise(response, toastGenericPatchMessages);
  }

  return (
    <div className="DadosGerais">
      <PageHeader.Root>
        <PageHeader.BackLink href="/configuracoes">Configurações</PageHeader.BackLink>

        <PageHeader.Title>Dados Gerais</PageHeader.Title>
      </PageHeader.Root>

      <form onSubmit={handleSubmit}>
        <Stack gap={8}>
          <Flex direction="column" gap={2}>
            <InputBox
              label="Nome da Acomodação"
              defaultValue={company.name}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  name: event.target.value,
                  slug: slugify(event.target.value),
                });
              }}
            />

            <SelectBox
              options={[
                {
                  value: "Pousada",
                  label: "Pousada",
                },
                { value: "Nome Lorem", label: "Nome Lorem" },
                { value: "Lorem Ipsum", label: "Lorem Ipsum" },
              ]}
              defaultValue={
                company.branchBusiness
                  ? {
                      value: company.branchBusiness,
                      label: company.branchBusiness,
                    }
                  : null
              }
              onChange={(e: { value: string; label: string }) => {
                setFormData({ ...formData, branchBusiness: e.value });
              }}
              label="Tipo de Negócio"
            />

            <SelectBox
              options={[
                {
                  value: "Brasília (GMT - 03:00)",
                  label: "Brasília (GMT - 03:00)",
                },
                { value: "Nome Lorem", label: "Nome Lorem" },
                { value: "Lorem Ipsum", label: "Lorem Ipsum" },
              ]}
              defaultValue={
                company.timezone
                  ? {
                      value: company.timezone,
                      label: company.timezone,
                    }
                  : null
              }
              onChange={(e: { value: string; label: string }) => {
                setFormData({ ...formData, timezone: e.value });
              }}
              label="Fuso Horário"
            />

            <section>
              <h4 className="mt-4">Idiomas disponíveis</h4>

              <CheckboxGroup
              // onChange={(value: string[]) => {
              //   setFormData({ ...formData, nights: value });
              // }}
              >
                <Stack spacing={[2]} direction={["column"]}>
                  <InputCheckboxBox>Português</InputCheckboxBox>
                  <InputCheckboxBox>Inglês</InputCheckboxBox>
                </Stack>
              </CheckboxGroup>
            </section>
          </Flex>

          <Button type="submit" isLoading={isSaving}>
            Salvar
          </Button>
        </Stack>
      </form>
    </div>
  );
}
