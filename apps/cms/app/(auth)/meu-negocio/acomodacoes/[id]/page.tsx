"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { SwitchBox } from "@/components/shared/form/SwitchBox";
import { Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState, type FormEvent } from "react";

import { AcomodacaoForm } from "@/components/acomodacoes/AcomodacaoForm";

import { useToast } from "@chakra-ui/react";
import { toastGenericPatchMessages } from "@/contexts/constants/toastMessages";

import type { Status } from "@/types/Status";
import { useGetData } from "@/hooks/useGetData";
import type { Acomodacao, UpdateAcomodacaoDTO } from "@/types/Acomodacao";
import { updateAcomodacao } from "@/services/acomodacao/updateAcomodacao";

export default function DetalhesExperienciasPage({ params }: { params: { id: string } }) {
  const { isLoading, data, error } = useGetData("property/" + params.id);
  const property: Acomodacao | null = data?.property ?? null;

  const [isSaving, setIsSaving] = useState<boolean>(false);
  // const [status, setStatus] = useState<Status>(property?.status ?? "Inativo");

  const toast = useToast();

  function saveExperience(e: FormEvent<HTMLFormElement>, formData: UpdateAcomodacaoDTO) {
    e.preventDefault();

    if (isSaving) {
      return;
    }

    setIsSaving(true);

    const payload = {
      ...formData,
      // status: status,
    } as UpdateAcomodacaoDTO;

    const response = new Promise((resolve, reject) => {
      resolve(updateAcomodacao(params.id, payload));
    }).finally(() => {
      setIsSaving(false);
    });

    toast.promise(response, toastGenericPatchMessages);
  }

  // useEffect(() => {
  //   if (property) {
  //     setStatus(property.status);
  //   }
  // }, [property]);

  return (
    <div className="DetalhesAcomodacoes">
      <PageHeader.Root>
        <Flex alignItems="center" justifyContent="space-between" gap={2}>
          <PageHeader.BackLink href="/meu-negocio/acomodacoes">Acomodações</PageHeader.BackLink>

          {!isLoading && (
            <SwitchBox
              label="Ativa"
              id="status"
              name="status"
              // onChange={() => {
              //   status === "Ativo" ? setStatus("Inativo") : setStatus("Ativo");
              // }}
              // isChecked={status === "Ativo"}
              isChecked
            />
          )}
        </Flex>

        <PageHeader.Title>Detalhes da Acomodação</PageHeader.Title>
      </PageHeader.Root>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <AcomodacaoForm onSubmit={saveExperience} data={property ?? null} isSaving={isSaving} />
      )}
    </div>
  );
}
