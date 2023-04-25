import SignUpContainer from "@/components/common/SignUpContainer";
import React from "react";
import { FormLabel, RadioGroup, Radio, HStack } from "@chakra-ui/react";
import axios from "axios";
import AuthContext from "@/context/authContext";
import { useContext } from "react";
import { useRouter } from "next/router";

const Gender = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [gender, setGender] = React.useState<string | null>(null);
  // const [user, setUser] = React.useState<null | string>(null);
  const [isPending, setIsPending] = React.useState<boolean>(false);
  console.log(user);

  const handleGender = async () => {
    setIsPending(true);
    const res = await axios.post(
      "/api/update/user-gender",
      { uid: user, gender },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    setIsPending(false);
    if (res.status === 200) router.push("/signup/bio");
  };

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
