import { Icons } from "@/components/svgs/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  type ModalProps,
  Button,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface AddToCartModal extends Omit<ModalProps, "children"> {
  onClickSeeMore: () => void;
}

export function AddToCartModal({ onClickSeeMore, ...props }: AddToCartModal) {
  return (
    <Modal isCentered {...props}>
      <ModalOverlay />
      <ModalContent p={5} paddingTop={10}>
        <ModalBody>
          <Flex
            direction={"column"}
            justifyContent={"center"}
            gap={2}
            fontSize={16}
            fontWeight={600}
            textAlign={"center"}
            marginBottom={4}
          >
            <Icons.CheckSquare className="mx-auto clr-primary w-[1.875rem] h-auto" />
            Acomodacação adicionada ao carrinho
          </Flex>

          <Flex direction={"column"} gap={2}>
            <Button fontSize={14} variant={"outline"} onClick={onClickSeeMore}>
              + Adicionar mais acomodações
            </Button>
            <Button fontSize={14} as={Link} href={"/carrinho"}>
              Avançar <Icons.ChevronRight />
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
