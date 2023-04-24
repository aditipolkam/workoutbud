import SignUpContainer from "@/components/common/SignUpContainer";
import React from "react";
import { FormControl, FormLabel, Input, Center } from "@chakra-ui/react";

const Name = () => {
  const [name, setName] = React.useState<string | null>(null);

  const handleName = () => {};
  return (
    <SignUpContainer handleClick={handleName}>
      <FormControl mt={4}>
        <FormLabel>
          <p>So tell us,</p>
          <p>what do you want people to call you?</p>
        </FormLabel>
        <Input
          placeholder="nick, bob, jen, rach, etc"
          onChange={(e) => setName(e.target.value)}
          borderColor={"blackAlpha.300"}
        />
      </FormControl>
    </SignUpContainer>
  );
};

export default Name;
