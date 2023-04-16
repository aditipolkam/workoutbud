import React, { useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  RadioGroup,
  Radio,
  HStack,
  Container,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const Signup = () => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [activities, setActivities] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {}, [error]);
  function handleSubmit() {
    console.log("submitting");
    if (nickname && gender && activities && timeSlots && description) {
      const data = {
        nickname,
        description,
        gender,
        activities: activities.split(","),
        timeSlots: timeSlots.split(","),
      };
      console.log(data);
    } else {
      console.log("error");
      setError("Please fill out all fields");
    }
  }

  return (
    <Container maxW="2xl" bg="#f1f1f1" className="rounded-2xl p-5">
      {/* nickname */}
      <FormControl mt={4} isRequired>
        <FormLabel>What do you want people to call you?</FormLabel>
        <Input placeholder="nick, bob, jen, rach, etc" name="nickname" />
      </FormControl>

      {/* description */}
      <FormControl mt={4} isRequired>
        <FormLabel>What do you do as a major part of your day?</FormLabel>
        <Input
          placeholder="your profession or basically what you do"
          name="description"
        />
      </FormControl>

      {/* gender */}
      <FormLabel mt={4}>What is your gender identity?</FormLabel>
      <RadioGroup name="gender">
        <HStack spacing="24px">
          <Radio value="Female">Female</Radio>
          <Radio value="Male">Male</Radio>
          <Radio value="Other">Other</Radio>
        </HStack>
      </RadioGroup>

      {/* interesting activities */}
      <FormControl mt={4} isRequired>
        <FormLabel>
          What do you prefer for a physical workout? (seperate with comma&apos;s
          plz)
        </FormLabel>
        <Input
          placeholder="basketball, jogging, swimming, hit the gym"
          name="activities"
        />
      </FormControl>

      {/* free time slot for activities */}
      <FormControl mt={4} isRequired>
        <FormLabel>
          What time slots do you prefer the above activities? (seperate with
          comma&apos;s plz)
        </FormLabel>
        <Input placeholder="7am-9am, 6:30pm-7:30pm" name="time_slots" />
      </FormControl>

      <Button
        mt={4}
        colorScheme="black"
        variant={"outline"}
        // isLoading={}
        onClick={handleSubmit}
      >
        Submit
      </Button>

      {
        <Text color="red" mt={5}>
          {error}
        </Text>
      }
    </Container>
  );
};

export default Signup;
