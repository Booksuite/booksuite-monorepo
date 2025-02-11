import React, { type HTMLAttributes } from "react";
import { Section } from "@/components/shared/Section";

import { SectionRootProps } from "@/components/shared/Section/SectionRoot";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

import { Icons } from "@/components/svgs/icons";

export function FAQSection(props: SectionRootProps) {
  return (
    <Section.Root
      {...props}
      className={` py-[1.875rem] ${props.className ?? ""}`}
    >
      <div className="container">
        <div className="text-center mb-12">
          <h3 className="flex items-center gap-2 justify-center">
            <Icons.Chat />
            Perguntas frequentes
          </h3>

          <p>Tire todas as suas dúvidas antes de reservar.</p>
        </div>

        <Accordion className="bg-white rounded-2xl overflow-hidden border text-[0.9375rem]">
          <AccordionItem>
            <h5 className="m-0">
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Quais horários de check-in e check-out?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h5>
            <AccordionPanel>
              A chegada é à partir das 14h e a saída é até às 12h. O formato é
              self check-in, onde você recebe as orientações e acessa seu chalé
              com total privacidade e comodidade.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h5 className="m-0">
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Aceitam pet?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h5>
            <AccordionPanel>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h5 className="m-0">
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Como faço para chegar até o chalé?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h5>
            <AccordionPanel>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h5 className="m-0">
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Que tipo de peixe tem na lagoa?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h5>
            <AccordionPanel>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h5 className="m-0">
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Como funciona o check-in e check-out?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h5>
            <AccordionPanel>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </Section.Root>
  );
}
