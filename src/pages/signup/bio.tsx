import SignUpContainer from "@/components/common/SignUpContainer";
import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Center,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import AuthContext from "@/context/authContext";
import { useContext } from "react";
import axios from "axios";

const Bio = () => {
  const [bio, setBio] = React.useState<string | null>(null);
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const handleBio = async () => {
    setIsPending(true);
    const res = await axios.post(
      "/api/update/user-bio",
      { uid: user, bio },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    setIsPending(false);
    if (res.status === 200) router.push("/signup/activities");
  };

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
