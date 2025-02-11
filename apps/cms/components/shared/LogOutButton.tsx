"use client";

import React from "react";
import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { ButtonProps } from "@chakra-ui/react";

export function LogOutButton(props: ButtonProps) {
  return (
    <Button onClick={() => signOut()} {...props}>
      {props.children}
    </Button>
  );
}
