import React from "react";
import { Button } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

type ButtonProps = {
  variant: "outline" | "solid" | undefined;
  handleClick?: () => void;
  children: React.ReactNode;
};

export default function CustomButton({
  variant,
  handleClick,
  children,
}: ButtonProps) {
  return (
    <Button variant={variant} onClick={handleClick} colorScheme="purple" m={2}>
      {children}
    </Button>
  );
}
