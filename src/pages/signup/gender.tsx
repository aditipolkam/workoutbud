import SignUpContainer from "@/components/common/SignUpContainer";
import React from "react";
import { FormLabel, RadioGroup, Radio, HStack } from "@chakra-ui/react";

const Gender = () => {
  const [gender, setGender] = React.useState<string | null>(null);

  const handleGender = () => {};

  return (
    <SignUpContainer handleClick={handleGender}>
      <FormLabel mt={4}>What is your gender identity?</FormLabel>
      <RadioGroup name="gender">
        <HStack spacing="24px">
          <Radio value="Female" onChange={(e) => setGender(e.target.value)}>
            Female
          </Radio>
          <Radio value="Male" onChange={(e) => setGender(e.target.value)}>
            Male
          </Radio>
          <Radio value="Other" onChange={(e) => setGender(e.target.value)}>
            Other
          </Radio>
        </HStack>
      </RadioGroup>
    </SignUpContainer>
  );
};

export default Gender;
