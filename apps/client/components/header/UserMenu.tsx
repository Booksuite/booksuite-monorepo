"use client";

import React from "react";

import { Icons } from "@/components/svgs/icons";
import { Stack } from "@chakra-ui/react";
import Link from "next/link";
import { useCartContext } from "@/hooks/useCartContext";

export default function UserMenu() {
  const { cart } = useCartContext();

  return (
    <Stack className="UserMenu" alignItems="center" gap={3} direction={"row"}>
      <div className="UserMenu__list">
        <Link className="relative" href={"/carrinho"}>
          <Icons.Cart className="UserMenu__cartIcon" />

          {cart.length > 0 && (
            <div className="flex items-center justify-center text-white text-[0.625rem] leading-[1] absolute top-0 right-0 translate-x-[50%] translate-y-[-50%] w-[1rem] h-[1rem] bg-red rounded-full">
              {cart.length < 9 ? cart.length : "9+"}
            </div>
          )}
        </Link>
      </div>

      <div className="UserMenu__profile">
        <Icons.Person className="UserMenu__profile__icon" />
      </div>
    </Stack>
  );
}
