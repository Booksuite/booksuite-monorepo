import React from "react";
import { Section } from "@/components/shared/Section";

import { SectionRootProps } from "@/components/shared/Section/SectionRoot";
import { Box, Image } from "@chakra-ui/react";

export function ReserveSection(props: SectionRootProps) {
  return (
    <Section.Root
      {...props}
      className={` py-[1.875rem] ${props.className ?? ""}`}
    >
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="mb-10">Reserve online</h2>

          <Box bgColor={"white"} className="rounded-2xl p-10">
            <h3>Aceitamos as principais formas de pagamento</h3>

            <p className="mb-0">
              <strong>
                Pix com {""}
                <span style={{ color: "var(--clr-green)" }}>
                  12% de desconto
                </span>
              </strong>{" "}
              à vista ou no
              <strong>Cartão de Crédito em até 10x sem juros</strong>
            </p>

            <Image
              src="/images/bandeiras.png"
              flexShrink={0}
              className="mx-auto"
            />
          </Box>
        </div>
      </div>
    </Section.Root>
  );
}
