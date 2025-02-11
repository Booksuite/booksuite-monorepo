"use client";

import { Icons } from "@/components/svgs/icons";
import React from "react";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Image, Stack } from "@chakra-ui/react";

interface AcomodacaoSlideProps {
  maxCapacity?: number;
  images?: Array<string>;
}
export default function AcomodacaoSlide(props: AcomodacaoSlideProps) {
  return (
    <div className="Acomodacao__slide">
      <Stack
        className="Acomodacao__topInfo z-10"
        justifyContent={"space-between"}
        direction={"row"}
        spacing={2}
      >
        {props.maxCapacity && (
          <div className="Acomodacao__topInfo__item Acomodacao__topInfo__maxCapacity">
            <Icons.Person width={12} /> {props.maxCapacity}
          </div>
        )}

        <button className="Acomodacao__topInfo__item Acomodacao__topInfo__mediaButton">
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
              <Image
                className="absolute inset-0 w-full h-full object-cover"
                src={image}
              />
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
  );
}
