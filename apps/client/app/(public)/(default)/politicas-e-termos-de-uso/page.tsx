"use client";

import { Section } from "@/components/shared/Section";
import React from "react";

import { SimpleGrid } from "@chakra-ui/react";
import { PromoSection } from "@/components/shared/Sections/PromoSection";
import { FAQSection } from "@/components/shared/Sections/FAQSection";
import { SmartSeachSection } from "@/components/shared/Sections/SmartSeachSection";
import { ReserveSection } from "@/components/shared/Sections/ReserveSection";
import { useCompanyContext } from "@/providers/companyProvider";

export default function PagePoliticasETermosDeUso() {
  const { company } = useCompanyContext();

  if (!company) {
    return;
  }

  return (
    <div className="PagePoliticasETermosDeUso">
      <Section.Root>
        <div className="container">
          <div className="text-center">
            <Section.Title>Conheça nossas políticas</Section.Title>
            <Section.Subtitle className="clr-primary">
              {company.name} - {company.city}, {company.state} - {company.country}
            </Section.Subtitle>

            <h4 className="font-normal mt-8 mb-4">
              Horários de check-in (entrada) e checkout (saída):
            </h4>

            <SimpleGrid className="bg-opacity p-4" columns={2} gap={4}>
              <div className="text-black">
                <p className="mb-2">Horário de entrada</p>

                <p>
                  Após <span className="font-bold text-2xl">14h</span>
                </p>
              </div>
              <div className="text-black">
                <p className="mb-2">Horário de saída</p>

                <p>
                  Até <span className="font-bold text-2xl">12h</span>
                </p>
              </div>
            </SimpleGrid>
          </div>

          <main>
            <div className="py-12">
              <h2>Políticas de reservas</h2>

              <div
                style={{ whiteSpace: "pre-wrap" }}
                dangerouslySetInnerHTML={{ __html: company.policy }}
              ></div>
            </div>

            <hr />

            <div className="py-12">
              <h2>Políticas de cancelamento e troca</h2>
              <h5>Faixas de penalização e reembolso:</h5>

              <div className="flex flex-col gap-4 mb-4">
                <div className="bg-opacity text-center p-4">
                  Cancelamento ou troca até 15 dias de antecedência da data de entrada:
                  <br />
                  <b>Cobrança de 20% do valor total da reserva</b>
                </div>

                <div className="bg-opacity text-center p-4">
                  Cancelamento ou troca entre 14 e 5 dias de antecedência da data de entrada:
                  <br />
                  <b>Cobrança de 50% do valor total da reserva</b>
                </div>

                <div className="bg-opacity text-center p-4">
                  Cancelamento ou troca 4 dias ou menos de antecedência da data de entrada ou o não
                  comparecimento:
                  <br />
                  <b>Cobrança de 100% do valor total da reserva</b>
                </div>
              </div>

              <h5>Demais regras de cancelamento e troca:</h5>
              <div
                style={{ whiteSpace: "pre-wrap" }}
                dangerouslySetInnerHTML={{ __html: company.cancelPolicy }}
              ></div>
            </div>

            <hr />

            <div className="py-12">
              <h2>Política de privacidade e cookies</h2>

              <p>
                Ao acessar este site, você está automaticamente aceitando nossa Política de
                Privacidade e os Termos de Uso. Ao efetuar uma reserva no HOTEL SONNET, você também
                concorda com a forma como os dados fornecidos são utilizados.
              </p>

              <p>
                Esta Política de Privacidade se aplica quando você utiliza os nossos Serviços que
                envolvem coleta de dados online e offline, o que inclui os Dados Pessoais que são
                coletados por meio de nossos vários serviços e canais, abrangendo websites,
                aplicativos, redes sociais de terceiros, Serviço de Atendimento ao Consumidor,
                pontos de venda, eventos e na recepção do Hotel Sonnet. Nossos usuários podem
                escolher, em determinados casos, os tipos de dados que coletamos, utilizamos e
                compartilhamos, conforme descrito nesta Política de Privacidade.
              </p>

              <p>
                Leia atentamente a presente página. Caso não concorde com estas políticas de
                privacidade, você deverá, imediatamente, sair do site e parar de utilizar os nossos
                serviços.
              </p>

              <p>
                Este contrato é acordado entre HOTEL SONNET, sociedade privada, inscrita no CNPJ sob
                o nº 07.867.925/0001-83, com sede na Rua ALBERTO OTTO 419, SANTA CANDIDA, na cidade
                de CURITIBA, no Paraná, Brasil, CEP 82.710-150, titular do site sonnet.com.br e os
                usuários dos serviços do HOTEL SONNET, bem como do site em questão.
              </p>

              <p>
                A finalidade desta Política de Privacidade é fornecer ao usuário compreensão clara e
                completa sobre o tratamento dos dados coletados, além de formalização de compromisso
                entre as partes.
              </p>

              <p>
                Este documento foi redigido de forma simples e acessível, contando com vários
                exemplos de coleta e de uso dos dados, justamente para que você possa ler e entender
                a forma como utilizamos os seus dados para oferecer uma experiência segura e
                confortável no uso dos serviços que oferecemos a você.
              </p>

              <p>1. EM QUE SITUAÇÕES ESTA DECLARAÇÃO SE APLICA?</p>

              <p>
                A presente Declaração informa-o sobre as modalidades de coleta, tratamento e
                utilização dos seus Dados quando você:
              </p>

              <ul className="list-disc flex flex-col gap-2">
                <li>Reserva um pacote de estadia junto ao Hotel Sonnet;</li>
                <li>
                  Visita o site do Hotel Sonnet ou outra aplicação móvel (neste documento denominado
                  “Site”);
                </li>
                <li>
                  Realiza inscrições nas nossas notícias do Hotel Sonnet (informações, produtos e
                  ofertas promocionais) e conteúdos personalizados;
                </li>
                <li>Pedidos de orçamento via e-mail, site, telefone ou presencialmente;</li>
                <li>É um cliente que visita o Hotel;</li>
                <li>
                  Faz parte do staff do Hotel como:  fornecedores, clientes e colaboradores do Hotel
                  Sonnet
                </li>
              </ul>

              <p>2. Informações coletadas automaticamente</p>

              <p>
                Para proporcionar os nossos serviços especializados e personalizados, coletamos
                algumas informações automaticamente: da mesma forma que muitos serviços de internet.
              </p>

              <p>
                A cada acesso do usuário ao site Hotel Sonnet, serão coletados alguns dados
                automaticamente:
              </p>

              <ul className="list-disc flex flex-col gap-2">
                <li>Características do dispositivo de acesso;</li>
                <li>Características do navegador;</li>
                <li>IP (com data e hora);</li>
                <li>Origem do IP;</li>
                <li>Informações sobre cliques e páginas acessadas;</li>
                <li>As páginas seguintes acessadas após a saída do site;</li>
                <li>Termos Hotel Sonnet de procura digitados no site ou em referência a este.</li>
              </ul>

              <p>
                O HOTEL SONNET pode utilizar também outras tecnologias padrões para coletar
                informações, como cookies, pixel tags, beacons e local shared objects, com o
                objetivo melhorar sua experiência de navegação.
              </p>

              <p>Dúvidas e sugestões</p>

              <p>
                Em caso de dúvida, reclamação ou sugestão referente à nossa Política de Privacidade,
                entre em contato. Nosso objetivo é sempre ter transparência e ética com nossos
                parceiros, colaboradores e clientes.
              </p>
            </div>
          </main>
        </div>
      </Section.Root>

      <PromoSection />

      <Section.Root className="bg-opacity">
        <ReserveSection />
        <FAQSection />
        <SmartSeachSection />
      </Section.Root>
    </div>
  );
}
