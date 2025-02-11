import { Section } from "@/components/shared/Section";
import { FAQSection } from "@/components/shared/Sections/FAQSection";
import { SectionPaymentMethods } from "@/components/shared/Sections/PaymentMethods";
import { SmartSeachSection } from "@/components/shared/Sections/SmartSeachSection";
import { SmartSearchBar } from "@/components/shared/SmartSearchBar";
import { Icons } from "@/components/svgs/icons";
import React from "react";

export default function LayoutPostTypeList({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="LayoutPostTypeList">
      <Section.Root className="bg-opacity bg-opacity--dark">
        <div className="container">
          <Section.Title className="text-center mb-4 flex items-center gap-2 justify-center">
            <Icons.Magic />
            Busca inteligente
          </Section.Title>

          <SmartSearchBar hideReserveButton={true} />
        </div>
      </Section.Root>
      {children}

      <SectionPaymentMethods className="bg-white !py-0" direction="column" />

      <Section.Root className="bg-opacity">
        <FAQSection />
        <SmartSeachSection />
      </Section.Root>
    </div>
  );
}
