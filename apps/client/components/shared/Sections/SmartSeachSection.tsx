import React, { type HTMLAttributes } from "react";
import { SmartSearchBar } from "@/components/shared/SmartSearchBar";
import { Section } from "@/components/shared/Section";

import { SectionRootProps } from "@/components/shared/Section/SectionRoot";

export function SmartSeachSection(props: SectionRootProps) {
  return (
    <Section.Root
      {...props}
      className={`text-center py-[1.875rem] ${props.className ?? ""}`}
    >
      <div className="container">
        <h3>Tem interesse em reservar?</h3>

        <p>Utilize a busca abaixo e efetue sua reserva online.</p>
        <SmartSearchBar />
      </div>
    </Section.Root>
  );
}
