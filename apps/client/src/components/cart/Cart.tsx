"use client";

import React from "react";
import { Flex, Image, Stack, type FlexProps } from "@chakra-ui/react";
import InputAmountNumberBox from "../shared/form/InputAmountBox";
import { Icon } from "../icons/Index";
import { useCartContext } from "../../common/hooks/useCartContext";

interface CartItemProps extends Omit<FlexProps, "id"> {
  id: number;
  title: string;
  description?: string;
  amount: number;
  price: number;
  discount?: number;
}

export default function CartItem({
  id,
  title,
  description,
  amount,
  price,
  discount,
  ...props
}: CartItemProps) {
  const { removeItem, updateItem } = useCartContext();

  let total = price;

  if (discount) {
    total -= price * (discount / 100);
  }

  return (
    <Flex className="w-full" gap={4} {...props}>
      <Image
        width={100}
        height={100}
        objectFit={"cover"}
        src={"/images/banner.jpg"}
        borderRadius={8}
      />

      <Stack direction={"column"} justifyContent={"space-between"} spacing={0} className="w-full">
        <Flex justifyContent={"space-between"}>
          <h3 className="text-base mb-0">{title}</h3>
          <button type="button" className="ml-auto flex-none" onClick={() => removeItem(id)}>
            <Icon.Trash />
          </button>
        </Flex>

        <div className="text-[0.9375rem] text-gray-700">{description}</div>

        <Flex justifyContent={"space-between"} alignItems={"end"} gap={2}>
          <div className="leading-3">
            {discount && (
              <div className="text-sm text-gray-700 mb-[-3px]">
                <s>
                  {price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </s>
                <span className="ml-1 clr-green font-bold">-{discount}%</span>
              </div>
            )}
            <span className="text-lg font-semibold">
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>

          <InputAmountNumberBox
            defaultValue={amount}
            onChange={(e) => {
              updateItem({ id: id, quantity: parseInt(e) });
            }}
          />
        </Flex>
      </Stack>
    </Flex>
  );
}
