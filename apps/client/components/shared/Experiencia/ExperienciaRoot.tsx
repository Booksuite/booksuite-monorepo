"use client";

import React, { HTMLProps } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Image, SimpleGrid } from "@chakra-ui/react";

interface ExperienciaRootProps extends HTMLProps<HTMLDivElement> {
  images?: Array<string>;
  columns?: number;
}

export function ExperienciaRoot({ columns = 2, ...props }: ExperienciaRootProps) {
  return (
    <article className="Experiencia rounded-3xl overflow-hidden bg-opacity">
      <SimpleGrid className="h-full" columns={columns}>
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={props.images && props.images.length > 0}
          className="w-full"
        >
          {props.images?.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                className={`object-cover h-full ${columns === 1 ? "aspect-[430/300]" : null}`}
                src={image}
              />
            </SwiperSlide>
          ))}

          {!props.images && (
            <SwiperSlide>
              <div className="relative h-full">
                <Image
                  className={`absolute inset-0 w-full h-full object-cover ${
                    columns === 1 ? "aspect-[430/300]" : null
                  }`}
                  src="/images/banner.jpg"
                />
              </div>
            </SwiperSlide>
          )}
        </Swiper>

        <div className="p-5 flex flex-col">{props.children}</div>
      </SimpleGrid>
    </article>
  );
}
