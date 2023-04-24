import SignUpContainer from "@/components/common/SignUpContainer";
import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Center,
  Textarea,
} from "@chakra-ui/react";
const Bio = () => {
  const [bio, setBio] = React.useState<string | null>(null);

  const handleBio = () => {};
  return (
    <SignUpContainer handleClick={handleBio}>
      <FormControl mt={4}>
        <FormLabel>
          <p>What do you do as a major part of your day?</p>
        </FormLabel>
        <Textarea
          placeholder="your profession or basically what you do"
          onChange={(e) => setBio(e.target.value)}
          borderColor={"blackAlpha.300"}
        />
      </FormControl>
    </SignUpContainer>
  );
};

export default Bio;
