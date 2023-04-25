import SignUpContainer from "@/components/common/SignUpContainer";
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { FormControl, FormLabel, Input, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AuthContext from "@/context/authContext";
import { useContext } from "react";

const Name = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [name, setName] = React.useState<string | null>(null);
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const handleName = async () => {
    setIsPending(true);
    const res = await axios.post(
      "/api/update/user-name",
      { uid: user, name: name },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    setIsPending(false);
    if (res.status === 200) router.push("/signup/gender");
  };
  return (
    <SignUpContainer handleClick={handleName}>
      <FormControl mt={4}>
        <FormLabel>
          <p>So tell us,</p>
          <p>what should people call you?</p>
        </FormLabel>
        <Input
          mt={3}
          placeholder="nick, bob, jen, rach, etc"
          onChange={(e) => setName(e.target.value)}
          borderColor={"blackAlpha.300"}
        />
      </FormControl>
    </SignUpContainer>
  );
};

export default Name;
