"use client";

import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Icons } from "@/components/svgs/icons";
import {
  Flex,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  useDisclosure,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import Link from "next/link";

interface AcomodacaoRootProps {
  className?: string;
  children: React.ReactNode;
  maxCapacity?: number;
  images?: Array<string>;
  direction?: "vertical" | "horizontal";
  contentBelow?: any;
}

export function AcomodacaoBody({ direction = "vertical", ...props }: AcomodacaoRootProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={5} paddingTop={10}>
          <ModalCloseButton />

          <ModalBody>
            <div
              className={` gap-2 ${
                props.images.length === 1 ? "columns-1" : "columns-2"
              } space-y-2`}
            >
              {props.images?.map((image, index) => (
                <Link href={image} target="_blank" key={index}>
                  <Image width={"100%"} src={image} />
                </Link>
              ))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Flex className="h-full" direction={direction === "horizontal" ? "row" : "column"}>
        <div className={`Acomodacao__slide ${direction === "horizontal" ? "w-6/12" : ""} `}>
          <Stack
            className="Acomodacao__topInfo w-full z-10"
            justifyContent={"space-between"}
            direction={"row"}
            spacing={2}
          >
            {props.maxCapacity && (
              <div className="Acomodacao__topInfo__item Acomodacao__topInfo__maxCapacity">
                <Icons.Person width={12} /> {props.maxCapacity}
              </div>
            )}

            <button
              className="Acomodacao__topInfo__item Acomodacao__topInfo__mediaButton"
              onClick={onOpen}
            >
              <Icons.MultiImages /> Fotos
            </button>
          </Stack>

          <Swiper
            modules={[Pagination, Navigation]}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={props.images && props.images.length > 0}
          >
            {props.images?.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative aspect-[377/275]">
                  <Image className="absolute inset-0 w-full h-full object-cover" src={image} />
                </div>
              </SwiperSlide>
            ))}

            {!props.images && (
              <SwiperSlide>
                <div className="relative aspect-[377/275]">
                  <Image
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/images/banner.jpg"
                  />
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>

        <Flex
          className={`Acomodacao__content ${
            direction === "horizontal" ? "h-auto w-6/12" : "h-full"
          }`}
          direction={"column"}
          gap={4}
        >
          {props.children}
        </Flex>
      </Flex>
    </>
  );
}
