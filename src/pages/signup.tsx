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
import { useLogin } from "@/hooks/useLogin";
import { User } from "@/types";

const Signup = () => {
  const { login, user, logout } = useLogin();
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [activities, setActivities] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(nickname, gender, activities, timeSlots, description);
    if (nickname && gender && activities && timeSlots && description) {
      setError("");
      const data = {
        nickname,
        description,
        gender,
        activities: activities.split(",").map(function (value: string) {
          return value.trim();
        }),
        timeSlots: timeSlots.split(",").map(function (value: string) {
          return value.trim();
        }),
      };
      await fetch("/api/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            setError(data.error);
          } else {
            setError("");
            window.location.href = "/";
          }
        });
    } else {
      setError("Please fill all the fields");
    }
  };

  useEffect(() => {
    if (localStorage) {
      let storeduser = localStorage.getItem("workoutbud_user");
      if (storeduser) setUserDetails(JSON.parse(storeduser));
      else setUserDetails(null);
    }
  }, [user]);

  if (!userDetails) return <div>Sign in first...</div>;

  return (
    <Container maxW="2xl" bg="#f1f1f1" className="rounded-2xl p-5">
      {/* nickname */}
      <form>
        <FormControl mt={4} isRequired>
          <FormLabel>What do you want people to call you?</FormLabel>
          <Input
            placeholder="nick, bob, jen, rach, etc"
            name="nickname"
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </FormControl>
        {/* description */}
        <FormControl mt={4} isRequired>
          <FormLabel>What do you do as a major part of your day?</FormLabel>
          <Input
            placeholder="your profession or basically what you do"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </FormControl>
        {/* gender */}
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
        {/* interesting activities */}
        <FormControl mt={4} isRequired>
          <FormLabel>
            What do you prefer for a physical workout? (seperate with
            comma&apos;s plz)
          </FormLabel>
          <Input
            placeholder="basketball, jogging, swimming, hit the gym"
            name="activities"
            onChange={(e) => setActivities(e.target.value)}
            required
          />
        </FormControl>
        {/* free time slot for activities */}
        <FormControl mt={4} isRequired>
          <FormLabel>
            What time slots do you prefer the above activities? (seperate with
            comma&apos;s plz)
          </FormLabel>
          <Input
            placeholder="7am-9am, 6:30pm-7:30pm"
            name="time_slots"
            onChange={(e) => setTimeSlots(e.target.value)}
            required
          />
        </FormControl>
        <Button
          mt={4}
          colorScheme="black"
          variant={"outline"}
          type="submit"
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
      </form>
    </Container>
  );
};

export default Signup;
