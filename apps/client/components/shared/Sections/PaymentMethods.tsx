import React from "react";

import { Section } from "@/components/shared/Section";
import { Flex, Image } from "@chakra-ui/react";

interface SectionPaymentMethodsProps {
  className?: string;
  direction?: "row" | "column";
}

export function SectionPaymentMethods({
  direction = "row",
  ...props
}: SectionPaymentMethodsProps) {
  return (
    <Section.Root
      className={`SectionPaymentMethods ${props.className ?? ""} ${
        direction === "column" ? "text-center" : ""
      }`}
    >
      <div className="container-big">
        <div className="SectionPaymentMethods__content">
          <div className="container">
            <Flex direction={direction} alignItems={"center"} gap={2}>
              <div>
                <h2 className="SectionPaymentMethods__title">
                  Aceitamos as principais formas de pagamento
                </h2>

                <h3 className="SectionPaymentMethods__subtitle">
                  <strong>
                    Pix com{" "}
                    <span style={{ color: "var(--clr-green)" }}>
                      12% de desconto
                    </span>
                  </strong>{" "}
                  à vista ou no{" "}
                  <strong>Cartão de Crédito em até 10x sem juros</strong>
                </h3>
              </div>

              <Image
                className="SectionPaymentMethods__image"
                src="/images/bandeiras.png"
                flexShrink={0}
              />
            </Flex>
          </div>
        </div>
      </div>
    </Section.Root>
  );
}
