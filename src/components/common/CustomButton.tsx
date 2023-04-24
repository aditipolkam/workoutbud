import React from "react";
import { Button } from "@chakra-ui/react";

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
    <Button
      variant={variant}
      onClick={handleClick}
      colorScheme="purple"
      m={2}
      minWidth={36}
    >
      {children}
    </Button>
  );
}
