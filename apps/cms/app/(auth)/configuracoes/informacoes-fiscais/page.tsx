"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import InputBox from "@/components/shared/form/InputBox";
import { Stack, Flex, Button, Alert, AlertDescription, useToast } from "@chakra-ui/react";
import React, { useState, type FormEvent } from "react";
import { Icons } from "@/components/svgs/icons";
import SelectBox from "@/components/shared/form/SelectBox";
import { useCompanyContext } from "@/app/providers/companyProvider";
import { toastGenericPatchMessages } from "@/contexts/constants/toastMessages";
import { updateCompany } from "@/services/company/updateCompany";
import type { UpdateCompanyDTO } from "@/types/Company";

export default function InformacoesFiscais() {
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

  if (!company) {
    return;
  }

  //"15.489.332/0001-21"
  return (
    <div className="InformacoesFiscais">
      <PageHeader.Root>
        <PageHeader.BackLink href="/configuracoes">Configurações</PageHeader.BackLink>

        <PageHeader.Title>Informações Fiscais</PageHeader.Title>
      </PageHeader.Root>

      <form onSubmit={handleSubmit}>
        <Stack gap={8}>
          <Flex direction="column" gap={2}>
            <InputBox
              label="Nome do Responsável"
              defaultValue={company.responsible}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  responsible: event.target.value,
                });
              }}
            />
            <InputBox
              type="email"
              label="E-mail do Responsável"
              defaultValue={company.responsibleEmail}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  responsibleEmail: event.target.value,
                });
              }}
            />
            <InputBox
              label="Telefone Celular"
              defaultValue={company.responsiblePhone}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  responsiblePhone: event.target.value,
                });
              }}
            />

            <Alert className="" justifyContent={"center"} gap={2}>
              <Icons.Info className="!w-auto" />
              <AlertDescription>
                <b>Importante:</b> os dados do responsável pela empresa não serão exibidos para o
                seu cliente.
              </AlertDescription>
            </Alert>

            <h2 className="mt-4 ">Informações do Negócio</h2>

            <SelectBox
              name="priceAdjustment"
              options={[
                {
                  value: "CNPJ",
                  label: "CNPJ",
                },
                { value: "Nome Lorem", label: "Nome Lorem" },
                { value: "Lorem Ipsum", label: "Lorem Ipsum" },
              ]}
              defaultValue={
                company.docType
                  ? {
                      value: company.docType,
                      label: company.docType,
                    }
                  : null
              }
              onChange={(e: { value: string; label: string }) => {
                setFormData({ ...formData, docType: e.value });
              }}
              label="Tipo de Documento"
            />
            <InputBox
              label="CNPJ"
              defaultValue={company.identification}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  identification: event.target.value,
                });
              }}
            />
            <InputBox
              label=" Razão Social"
              defaultValue={company.companyName}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  companyName: event.target.value,
                });
              }}
            />
            <InputBox
              label="Inscrição Estadual (opcional)"
              defaultValue={company.stateRegistration}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  stateRegistration: event.target.value,
                });
              }}
            />
            <InputBox
              label="Inscrição Municipal (opcional)"
              defaultValue={company.municipalRegistration}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  municipalRegistration: event.target.value,
                });
              }}
            />
            <InputBox
              label="Endereço"
              defaultValue={company.address}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  address: event.target.value,
                });
              }}
            />
            <InputBox
              label="Número"
              defaultValue={company.number}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  number: event.target.value,
                });
              }}
            />
            <SelectBox
              options={[
                {
                  value: "Santa Catarina",
                  label: "Santa Catarina",
                },
                { value: "Nome Lorem", label: "Nome Lorem" },
                { value: "Lorem Ipsum", label: "Lorem Ipsum" },
              ]}
              defaultValue={
                company.state
                  ? {
                      value: company.state,
                      label: company.state,
                    }
                  : null
              }
              onChange={(e: { value: string; label: string }) => {
                setFormData({ ...formData, state: e.value });
              }}
              label="Estado"
            />
            <SelectBox
              options={[
                {
                  value: "Santa Catarina",
                  label: "Santa Catarina",
                },
                { value: "Nome Lorem", label: "Nome Lorem" },
                { value: "Lorem Ipsum", label: "Lorem Ipsum" },
              ]}
              defaultValue={
                company.city
                  ? {
                      value: company.city,
                      label: company.city,
                    }
                  : null
              }
              onChange={(e: { value: string; label: string }) => {
                setFormData({ ...formData, city: e.value });
              }}
              label="Cidade"
            />
            <SelectBox
              name="priceAdjustment"
              options={[
                {
                  value: "Brasil",
                  label: "Brasil",
                },
                { value: "Nome Lorem", label: "Nome Lorem" },
                { value: "Lorem Ipsum", label: "Lorem Ipsum" },
              ]}
              defaultValue={
                company.country
                  ? {
                      value: company.country,
                      label: company.country,
                    }
                  : null
              }
              onChange={(e: { value: string; label: string }) => {
                setFormData({ ...formData, country: e.value });
              }}
              label="País"
            />
          </Flex>

          <Button type="submit" isLoading={isSaving}>
            Salvar
          </Button>
        </Stack>
      </form>
    </div>
  );
}
