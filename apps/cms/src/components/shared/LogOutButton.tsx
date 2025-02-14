"use client";

import { Button } from "@chakra-ui/react";
import { ButtonProps } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import React from "react";

export function LogOutButton(props: ButtonProps) {
  return (
    <Button onClick={() => signOut()} {...props}>
      {props.children}
    </Button>
  );
}
