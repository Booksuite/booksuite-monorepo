import { Box, Button, Flex, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { Icons } from "../svgs/icons";
import Link from "next/link";

interface PaymentStatusProps {
  status?: "aprovado" | "recusado" | "expirado" | "indisponível";
}

export default function PaymentStatus({ status = "aprovado" }: PaymentStatusProps) {
  let color = "clr-green";
  let icon = <Icons.CheckSquare />;
  let title = "Pagamento aprovado!";
  let subTitle = "Sua reserva foi efetuada com sucesso.";
  let content = (
    <p>
      Enviamos em seu e-mail e WhatsApp a confirmação da sua reserva. <br /> Caso você não receba
      entre em contato conosco.
    </p>
  );
  let buttonLeft = null;
  let buttonRight = null;

  switch (status) {
    case "recusado":
      color = "clr-red";
      icon = <Icons.XSquare />;
      title = "Pagamento recusado!";
      subTitle = "Atenção! Sua reserva não foi confirmada.";
      content = <p>Efetue uma nova tentativa clicando no botão abaixo para não perder sua data:</p>;
      buttonLeft = {
        href: "/carrinho",
        label: "Ir para o carrinho",
      };
      buttonRight = {
        href: "#",
        label: "Alterar forma de pagamento",
      };
      break;

    case "indisponível":
      color = "clr-red";
      icon = <Icons.Disabled />;
      title = "Acomodação indisponível";
      subTitle = "Atenção: a data escolhida não está mais disponível para esta acomodação!";
      content = <p>Clique no botão abaixo e escolha outra acomodação disponível:</p>;
      buttonLeft = {
        href: "/carrinho",
        label: "Ir para o carrinho",
      };
      buttonRight = {
        href: "/acomodacoes",
        label: "Escolher outra acomodação",
      };
      break;

    case "expirado":
      color = "clr-yellow";
      icon = <Icons.Clock />;
      title = "O prazo do seu pagamento expirou!";
      subTitle = "Atenção! Sua reserva não foi concluída.";
      content = <p>Efetue uma nova tentativa no botão abaixo:</p>;
      buttonLeft = {
        href: "#",
        label: "Alterar forma de pagamento",
      };
      buttonRight = {
        href: "#",
        label: "Gerar novo código pix",
      };
      break;

    default:
      break;
  }

  return (
    <>
      <Box className="text-center" padding={16}>
        <i className={`${color} bg-opacity block mb-4 w-fit mx-auto p-6 before:rounded-full`}>
          {icon}
        </i>

        <h1 className="text-2xl mb-2">{title}</h1>
        <p className={`${color} font-medium`}>{subTitle}</p>
        {content}
      </Box>

      {status === "aprovado" ? (
        <Box textAlign={"center"} padding={8} className="bg-opacity">
          <h2 className="text-lg">Queremos a sua opinião!</h2>
          <p className="text-[0.9375rem]">
            Responda a nossa pesquisa rápida para podermos melhorar a sua experiência.
            <br />É só clicar no botão abaixo, leva poucos minutos e nos ajudará muito!
          </p>

          <Button variant={"outline"} className="text-[0.9375rem]">
            Responder pesquisa rápida <Icons.ChevronRight />
          </Button>
        </Box>
      ) : (
        <SimpleGrid maxW={660} marginInline={"auto"} columns={2} gap={4}>
          <Button
            as={Link}
            href={buttonLeft.href ?? "#"}
            variant={"outline"}
            className="text-[0.9375rem]"
          >
            {buttonLeft.label ?? ""}
          </Button>
          <Button as={Link} href={buttonRight.href ?? "#"} className="text-[0.9375rem]">
            {buttonRight.label ?? ""}
          </Button>
        </SimpleGrid>
      )}
    </>
  );
}
