import { Container, Center } from "@chakra-ui/react";
import React from "react";
import CustomButton from "@/components/common/CustomButton";

const SignUpContainer = ({
  handleClick,
  children,
}: {
  handleClick: any;
  children: any;
}) => {
  return (
    <Container
      maxW="550px"
      bg="gray.100"
      color="black"
      rounded={10}
      p={5}
      shadow={"md"}
      mb={20}
    >
      {children}
      <Center mt={5}>
        <CustomButton variant="solid" handleClick={handleClick}>
          Next
        </CustomButton>
      </Center>
    </Container>
  );
};

export default SignUpContainer;
